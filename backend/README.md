LED Cube - Web Server
=====================

## Installation

On the RPi :

    mkdir -p /home/cube/server/backend/scripts
    mkdir /home/cube/server/backend/config

Depuis le poste local copier : 
   
    pip freeze > requirements.txt

    rsync -avi \
        --exclude .venv \
        --exclude .DS_Store \
        --exclude "*.md" \
        --exclude "X*" \
        --exclude "*.egg-info" \
        --exclude cpp \
        --exclude __pycache__ \
        --delete \
        requirements.txt \
        src/ \
        pi-de-e0:/home/cube/server/backend/

    rsync -i \
        config/config_server.json \
        pi-de-e0:/home/cube/server/config/


Sur le serveur : 

    cd /home/cube/server/backend
    python3 -m venv --system-site-packages .venv
    . .venv/bin/activate
    pip install -r requirements.txt

    # export CUBE_ENV=/home/cube/server/config/config_server.json

Update the config : 

    ...

Test : 

    python app.py

