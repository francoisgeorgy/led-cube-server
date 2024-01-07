import argparse
import json
import logging
import os
import signal
import subprocess
import sys
import time

from bottle import run, response, Bottle, error, static_file, json_dumps

from utils.applications import get_applications
from utils.host import get_cube_ip

verbose = False

#
# The path to the config file can also be passed as a command line argument.
# Otherwise the file is searched for in the './config' directory.
#
# FIXME: use an option; sanitize the entry.
# if len(sys.argv) > 1:
#     config_file_name = sys.argv[1]
# else:
#     config_file_name = os.path.join('.', 'config', config_file)

app = Bottle()

# Max one script can be running
running_script = None


def _call_script(script):
    global running_script
    if running_script:
        return None
    script_path = os.path.join(app.config['scripts_dir'], script)
    if not os.path.isfile(script_path):
        return None
    try:
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        running_script = {
            'script': script,
            'process': p
        }
        return os.getpgid(p.pid)
    except Exception as e:
        return None


@error(404)
def page_not_found(e):
    return dict(error=404, text=str(e))


# @app.route('/api/scripts')
# def scripts():
#     # Get the directory path from the configuration
#     directory = app.config.get('scripts_dir', '.')
#
#     # List all files in the directory
#     try:
#         files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
#     except FileNotFoundError:
#         response.status = 404
#         return {"error": "Scripts directory not found"}
#
#     # Return the list of files as JSON
#     response.content_type = 'application/json'
#     return json.dumps(files)


@app.route('/api/start/<category>/<script>')
def start_script(category, script):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    :param category:
    :param script: the filename of the script, without the path
    :return:
    """
    global running_script
    if running_script:
        response.status = 409   # conflict
        return {"error": f"A script is already running."}
    script_path = os.path.join(app.config['scripts_dir'], category, script)
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


@app.route('/api/stop/<category>/<script>')
def stop_script(category, script):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    :param category:
    :param script: the filename of the script, without the path
    :return:
    """
    # TODO: rename "callScript"
    script_path = os.path.join(app.config['scripts_dir'], category, script)
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
        s = running_script['script']
        running_script = None
        return {"message": f"script {s} stopped"}
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


@app.route('/api/server/restart')
def server_restart():
    script_path = os.path.join(app.config['scripts_dir'], 'server', 'server_restart.sh')
    if not os.path.isfile(script_path):
        response.status = 400
        return {"error": f"{script_path} does not exist"}
    try:
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        return {"message": f"process {os.getpgid(p.pid)} called"}
    except Exception as e:
        response.status = 500
        return {"error": str(e)}


@app.route('/api/system/reboot')
def system_reboot():
    os.system('sudo reboot')


@app.route('/api/system/poweroff')
def server_poweroff():
    os.system('sudo poweroff')


@app.route('/api/applications/<category>')
def applications(category):
    response.content_type = 'application/json'
    return json_dumps(get_applications(app.config['scripts_dir'], category))


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


def setup_logging(log_destination):
    if log_destination == '--':
        # Logging to standard output
        logging.basicConfig(stream=sys.stdout, level=logging.INFO,
                            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    elif log_destination:
        # Logging to the specified file
        logging.basicConfig(filename=log_destination, level=logging.INFO,
                            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    else:
        # Disable logging if no argument is passed
        logging.disable(logging.CRITICAL)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='LED Cube server')

    # To run this script with logging enabled and output to standard output:
    #
    #   python server.py -v
    #
    # To run this script with logging enabled and output to a file (e.g., output.log):
    #
    #   python script.py --logfile output.log
    #

    parser.add_argument('-c', '--config', type=str, default=None, help='Path to the configuration file')
    parser.add_argument('-s', '--script', type=str, default=None, help='Name of the script to run')
    parser.add_argument('-v', '--verbose', action='store_true', help='Enable verbose mode')
    parser.add_argument("--logfile", type=str, nargs='?', const='--', default=None,
                        help="Specify '--' to log to standard output, or provide a filename to log to that file")
    args = parser.parse_args()

    verbose = args.verbose

    setup_logging(args.logfile)

    # Access and configure Bottle's logger to use your settings
    bottle_logger = logging.getLogger('bottle')
    bottle_logger.setLevel(logging.INFO)  # Set the logging level you desire for Bottle

    # Example logging
    if args.logfile:
        logging.info("Logging to file: {}".format(args.logfile))

    # TODO,FIXME : redirect Bottle logs to a file
    logging.info(f"Configuration file: {args.config}")
    logging.info(f"Script to run: {args.script}")

    # Load configuration from the file
    env = os.getenv('CUBE_ENV', 'development')
    if args.config is None:
        config_file = os.path.join('.', 'config', f'config.{env}.json')
    else:
        config_file = args.config
    try:
        with open(config_file, 'r') as f:
            config_data = json.load(f)
    except FileNotFoundError:
        print(f'Config file {config_file} not found')
        sys.exit(1)
    except PermissionError:
        print(f'Unable to read config file {config_file}')
        sys.exit(1)
    app.config.update(config_data)
    logging.info(f'configuration loaded from {config_file}')

    if args.script is not None:
        _call_script(args.script)
        # TODO: handle error if script not found

    # host_ip = '0.0.0.0' # listen on all available public IPs of the machine.
    host_ip = get_cube_ip()
    # TODO: use a better WSGI runner (e.g. gunicorn)
    run(app=app, host=f'{host_ip}', port=5040, debug=False, reloader=False)
