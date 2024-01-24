import os


APP_SCRIPT_START_SUFFIX = '_start'
APP_SCRIPT_STOP_SUFFIX = '_stop'
APP_SCRIPT_EXT = '.sh'


def get_applications(directory, category=''):

    # print("get_applications", directory, category, os.path.join(directory, category))

    applications = []
    try:
        files = os.listdir(os.path.join(directory, category))
        files.sort()
        for file in files:
            # print(file)
            if file.endswith("_start.sh"):
                app_name = os.path.splitext(file)[0]
                app_name = app_name.replace(APP_SCRIPT_START_SUFFIX, '')

                app_description = ""
                description_file = os.path.join(directory, app_name + ".md")
                if os.path.exists(description_file):
                    with open(description_file, 'r') as f:
                        app_description = f.read()

                stop_script = app_name.replace(APP_SCRIPT_START_SUFFIX, APP_SCRIPT_STOP_SUFFIX) + APP_SCRIPT_EXT
                if not os.path.exists(os.path.join(directory, stop_script)):
                    stop_script = None

                applications.append({
                    "category": category,
                    "application": app_name,
                    "title": app_name,
                    "requiresConfirmation": False,       # TODO: define requiresConfirmation
                    "description": app_description,
                } | ({"stop_script": stop_script} if stop_script is not None else {}))

    except FileNotFoundError:
        # TODO: log warning
        pass
    return applications

