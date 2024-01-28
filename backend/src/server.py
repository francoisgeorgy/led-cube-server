import argparse
import json
import logging
import os
import signal
import subprocess
import sys
import time

from bottle import run, response, Bottle, error, static_file, json_dumps

from utils.applications import get_applications, APP_SCRIPT_STOP_SUFFIX, APP_SCRIPT_START_SUFFIX, APP_SCRIPT_EXT
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


@app.route('/api/start/<category>/<application>')
def start_application(category, application):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    For each application, two scripts must exist :

    - <category>/<application>_start.sh
    - <category>/<application>_stop.sh

    :param category:
    :param application: the name of the application
    :return:
    """
    global running_script

    logging.info(f'start_application({category}, {application})')

    if category == 'special' and application == 'server_restart':
        return server_restart()

    # If a script is already running, we stop it
    # TODO: add option to ignore request if a script is already running
    if running_script:

        logging.debug(f"{running_script['category']}/{running_script['application']} is already running")

        # If the requested script is already running, we do nothing
        # if running_script['category'] == category and running_script['application'] == application:
        #     return {"message": f"{category}/{application} is already running"}

        # # response.status = 409   # conflict
        # # return {"error": f"A script is already running."}
        # try:
        #     pid = os.getpgid(running_script['process'].pid)
        #     os.killpg(pid, signal.SIGTERM)  # Send the signal to all the process groups
        #     # s = running_script['application']
        #     running_script = None
        #     # return {"message": f"application {category}/{application} stopped"}
        # except Exception as e:
        #     response.status = 500
        #     return {"error": str(e)}
        # stop_application(category, application)
        script_path = os.path.join(app.config['scripts_dir'], running_script['category'], running_script['application']) + APP_SCRIPT_STOP_SUFFIX + APP_SCRIPT_EXT
        if not os.path.isfile(script_path):
            logging.error(f"unable to stop running application {script_path}, stop script not found")
            response.status = 400
            return {"error": f"unable to stop running application {running_script['category']}/{running_script['application']}, stop script not found"}
        try:
            # subprocess.Popen is non-blocking
            # The os.setsid() is passed in the argument preexec_fn so
            # it's run after the fork() and before exec() to run the shell.
            logging.debug(f'calling {script_path}')
            p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
            # return {"message": f"process {os.getpgid(p.pid)} called"}
        except Exception as e:
            logging.exception(f'error when calling {script_path}')
            response.status = 500
            return {"error": str(e)}

    # logging.debug(f"scripts_dir {app.config['scripts_dir']}")
    script_path = os.path.join(app.config['scripts_dir'], category, application) + APP_SCRIPT_START_SUFFIX + APP_SCRIPT_EXT
    # logging.debug(f"script_path {script_path}")
    if not os.path.isfile(script_path):
        logging.error(f"{script_path} start script not found")
        response.status = 400
        return {"error": f"{category}/{application} start script not found"}
    try:
        # subprocess.Popen is non-blocking
        # The os.setsid() is passed in the argument preexec_fn so
        # it's run after the fork() and before exec() to run the shell.
        logging.debug(f'calling {script_path}')
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        running_script = {
            'category': category,
            'application': application,
            'process': p
        }
        return {"message": f"{category}/{application} started"}
    except Exception as e:
        logging.exception(f'error when calling {script_path}')
        response.status = 500
        return {"error": str(e)}


@app.route('/api/stop/<category>/<application>')
def stop_application(category, application):
    """
    https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true/4791612#4791612

    :param category:
    :param application: the filename of the script, without the path
    :return:
    """
    logging.info(f'stop_application({category}, {application})')

    global running_script
    script_path = os.path.join(app.config['scripts_dir'], category, application) + APP_SCRIPT_STOP_SUFFIX + APP_SCRIPT_EXT
    if not os.path.isfile(script_path):
        logging.error(f"{category}/{application} start script not found")
        response.status = 400
        return {"error": f"{category}/{application} start script not found"}
    try:
        # subprocess.Popen is non-blocking
        # The os.setsid() is passed in the argument preexec_fn so
        # it's run after the fork() and before exec() to run the shell.
        logging.debug(f'calling {script_path}')
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        running_script = None
        return {"message": f"process {os.getpgid(p.pid)} called"}
    except Exception as e:
        logging.exception(f'error when calling {script_path}')
        response.status = 500
        return {"error": str(e)}


@app.route('/api/stop')
def stop_current_script():
    """
    Stops the currently running script

    :return:
    """
    logging.info(f'stop_current_script()')

    global running_script
    if running_script is None:
        response.status = 400
        return {"error": f"No script is running"}
    try:
        pid = os.getpgid(running_script['process'].pid)
        os.killpg(pid, signal.SIGTERM)  # Send the signal to all the process groups
        c = running_script['category']
        s = running_script['application']
        running_script = None
        return {"message": f"script {c}/{s} stopped"}
    except Exception as e:
        response.status = 500
        return {"error": str(e)}


@app.route('/api/stop')
def panic_stop():
    """
    Call all the stop script one after the other.

    TODO: create a panic_stop script ?
    """
    logging.info('panic_stop()')
    pass


@app.route('/api/running')
def running():
    """

    :return: the list of running scripts
    """
    if running_script is not None:
        return {"running": {
            'category': running_script['category'],
            'application': running_script['application']
        }}
    else:
        return {"running": None}


@app.route('/api/ping')
def ping():
    """Utility api end-point mainly for quick-testing; could be used to monitor is the server is up."""
    logging.info('ping()')
    return {"message": "pong"}


# @app.route('/api/server/restart/<code>')
def server_restart():
    # TODO: replace the code by a more robust security check; the code can easily be grabbed from the browser console.
    logging.info(f'server_restart()')
    # if code != '424242':
    #     logging.debug(f"server_restart: invalid code")
    #     return
    script_path = os.path.join(app.config['scripts_dir'], 'system', 'server_restart.sh')
    if not os.path.isfile(script_path):
        logging.error(f"{script_path} not found")
        response.status = 400
        return {"error": f"{script_path} not found"}
    try:
        logging.debug(f'calling {script_path}')
        p = subprocess.Popen(script_path, stdout=subprocess.PIPE, shell=False, preexec_fn=os.setsid)
        return {"message": f"restart started"}
    except Exception as e:
        logging.exception(f'error when calling {script_path}')
        response.status = 500
        return {"error": str(e)}


@app.route('/api/system/reboot/<code>')
def system_reboot(code):
    # TODO: replace the code by a more robust security check; the code can easily be grabbed from the browser console.
    logging.info(f'server_restart()')
    if code != '424242':
        logging.warning(f"system_reboot: invalid code")
        return
    logging.info(f"system_reboot: trigger reboot")
    os.system('sudo reboot')


@app.route('/api/system/poweroff/<code>')
def server_poweroff(code):
    # TODO: replace the code by a more robust security check; the code can easily be grabbed from the browser console.
    logging.info(f'server_poweroff()')
    if code != '424242':
        logging.debug(f"server_restart: invalid code")
        return
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
    # We force the config of the logging backend because it may have already been setup
    # by the wsgi server.
    # TODO: understand and solve the logging config
    if log_destination == '-':
        # Logging to standard output
        logging.basicConfig(stream=sys.stdout, level=logging.DEBUG if verbose else logging.INFO,
                            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                            datefmt='%Y-%m-%d %H:%M:%S',
                            force=True)
    elif log_destination:
        # Logging to the specified file
        logging.basicConfig(filename=log_destination, level=logging.DEBUG if verbose else logging.INFO,
                            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                            datefmt='%Y-%m-%d %H:%M:%S',
                            force=True)
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
    parser.add_argument("--logfile", type=str, nargs='?', const='-', default=None,
                        help="Specify '-' to log to standard output, or provide a filename to log to that file")
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

    # host_ip = get_cube_ip()
    host_ip = '0.0.0.0' # listen on all available public IPs of the machine.
    # TODO: use a better WSGI runner (e.g. gunicorn)
    # quiet=True disable all access logs
    run(app=app, host=f'{host_ip}', port=5040, debug=False, reloader=False, quiet=True)
