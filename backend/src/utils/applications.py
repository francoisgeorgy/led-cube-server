import os


def get_applications(directory):
    applications = []
    for file in os.listdir(directory):
        if file.startswith("start_") and file.endswith(".sh"):
            app_name = os.path.splitext(file)[0]

            app_description = ""
            description_file = os.path.join(directory, app_name + ".md")
            if os.path.exists(description_file):
                with open(description_file, 'r') as f:
                    app_description = f.read()

            stop_script = app_name.replace('start_', 'stop_') + ".sh"
            if not os.path.exists(os.path.join(directory, stop_script)):
                stop_script = None

            applications.append({
                "start_script": file,
                "title": app_name,
                "requiresConfirmation": False,       # TODO: define requiresConfirmation
                "description": app_description,
            } | ({"stop_script": stop_script} if stop_script is not None else {}))
    return applications

