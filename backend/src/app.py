import json
import os
import signal
import subprocess
import sys

from bottle import run, response, Bottle, error, static_file, json_dumps

from utils.applications import get_applications
from utils.host import get_cube_ip

# Determine the environment and choose the corresponding config file
env = os.getenv('CUBE_ENV', 'development')
config_file = f'config.{env}.json'

#
# The path to the config file can also be passed as a command line argument.
# Otherwise the file is searched for in the './config' directory.
#
# FIXME: use an option; sanitize the entry.
if len(sys.argv) > 1:
    config_file_name = sys.argv[1]
else:
    config_file_name = os.path.join('.', 'config', config_file)

# Load configuration from the file
try:
    with open(config_file_name, 'r') as f:
        config_data = json.load(f)
    print('configuration loaded from {}'.format(config_file_name))
except FileNotFoundError:
    print("Config file not found")
    sys.exit(1)

app = Bottle()
app.config.update(config_data)

# Max one script can be running
running_script = None


@error(404)
def page_not_found(e):
    return dict(error=404, text=str(e))


@app.route('/api/scripts')
def scripts():
    # Get the directory path from the configuration
    directory = app.config.get('scripts_dir', '.')

    # List all files in the directory
    try:
        files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    except FileNotFoundError:
        response.status = 404
        return {"error": "Scripts directory not found"}

    # Return the list of files as JSON
    response.content_type = 'application/json'
    return json.dumps(files)


@app.route('/api/start/<script>')
def start_script(script):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    :param script: the filename of the script, without the path
    :return:
    """
    global running_script
    if running_script:
        response.status = 409   # conflict
        return {"error": f"A script is already running."}
    script_path = os.path.join(app.config['scripts_dir'], script)
    if not os.path.isfile(script_path):
        response.status = 400
        return {"error": f"{script_path} does not exist"}
    try:
        # subprocess.Popen is non-blocking
        # The os.setsid() is passed in the argument preexec_fn so
        # it's run after the fork() and before exec() to run the shell.
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        running_script = {
            'script': script,
            'process': p
        }
        return {"message": f"process {os.getpgid(p.pid)} started"}
    except Exception as e:
        response.status = 500
        return {"error": str(e)}


@app.route('/api/stop/<script>')
def stop_script(script):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    :param script: the filename of the script, without the path
    :return:
    """
    # TODO: rename "callScript"
    script_path = os.path.join(app.config['scripts_dir'], script)
    if not os.path.isfile(script_path):
        response.status = 400
        return {"error": f"{script_path} does not exist"}
    try:
        # subprocess.Popen is non-blocking
        # The os.setsid() is passed in the argument preexec_fn so
        # it's run after the fork() and before exec() to run the shell.
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        return {"message": f"process {os.getpgid(p.pid)} called"}
    except Exception as e:
        response.status = 500
        return {"error": str(e)}


@app.route('/api/stop')
def stop_current_script():
    """
    Stops the currently running script

    :return:
    """
    global running_script
    if running_script is None:
        response.status = 400
        return {"error": f"No script is running"}
    try:
        pid = os.getpgid(running_script['process'].pid)
        os.killpg(pid, signal.SIGTERM)  # Send the signal to all the process groups
        running_script = None
        return {"message": f"script {running_script['script']} stopped"}
    except Exception as e:
        response.status = 500
        return {"error": str(e)}


@app.route('/api/running')
def running():
    """

    :return: the list of running scripts
    """
    if running_script is not None:
        return {"running": running_script['script']}
    else:
        return {"running": ""}


@app.route('/api/ping')
def ping():
    """Utility api end-point mainly for quick-testing; could be used to monitor is the server is up."""
    return {"message": "pong"}


@app.route('/api/applications')
def applications():
    response.content_type = 'application/json'
    return json_dumps(get_applications(app.config['scripts_dir']))


@app.route('/<filename:path>')
def send_static(filename):
    return static_file(filename, root=app.config['front_end'])


@app.route('/')
def serve_home():
    return static_file('index.html', root=app.config['front_end'])


@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'


if __name__ == '__main__':
    host_ip = get_cube_ip()
    run(app=app, host=f'{host_ip}', port=5040, debug=False, reloader=False)
