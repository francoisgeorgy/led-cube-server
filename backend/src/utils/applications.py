import os


def get_applications(directory):
    applications = []
    for file in os.listdir(directory):
        if file.endswith(".sh"):
            app_name = os.path.splitext(file)[0]
            app_description = ""
            md_file = os.path.join(directory, app_name + ".md")

            if os.path.exists(md_file):
                with open(md_file, 'r') as f:
                    app_description = f.read()

            applications.append({
                "script": file,
                "title": app_name,
                "description": app_description,
                "requiresConfirmation": False       # TODO: define requiresConfirmation
            })
    return applications

