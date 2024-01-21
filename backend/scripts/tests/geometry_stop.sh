#!/bin/bash

cd /home/cube/python || exit

source /home/cube/python/.venv/bin/activate

APP="cube_layout"

app_pid=$(pgrep -f "${APP}.py" | tail -n 1)

if [ -n "$app_pid" ]; then
    echo "${APP} PID is: $app_pid"
    sudo kill -9 $app_pid
else
    echo "Aucun process ${APP} trouvé."
fi
