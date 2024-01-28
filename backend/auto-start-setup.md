
/lib/systemd/system/cube.service :

    [Unit]
    Description=Cube Service
    After=network.target

    [Service]
    Type=idle
    ExecStart=/home/cube/server/backend/start-server-with-application.sh

    StandardOutput=append:/home/cube/logs/cube.service.log
    StandardError=append:/home/cube/logs/cube.service.log

    [Install]
    WantedBy=multi-user.target

/home/cube/server/backend/start-server-with-application.sh :

    #!/bin/bash
    cd /home/cube/server/backend || exit
    source /home/cube/.venv/bin/activate
    python src/server.py --start startup --logfile -

Load the service configuration : 

    sudo systemctl daemon-reload

Start on boot :

    sudo systemctl enable cube.service
    Created symlink /etc/systemd/system/multi-user.target.wants/cube.service → /lib/systemd/system/cube.service.

Disable running on boot : 

    sudo systemctl disable cube.service

Check status : 

    systemctl status cube.service

Start / Stop : 

    sudo systemctl start cube.service
    sudo systemctl stop cube.service

