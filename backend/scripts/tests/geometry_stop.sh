#!/bin/bash

cd /home/cube/emulator || exit

source /home/cube/emulator/.venv/bin/activate

APP="cube_layout"

app_pid=$(pgrep -f "${APP}.py" | tail -n 1)

if [ -n "$app_pid" ]; then
    echo "${APP} PID is: $app_pid"
    # We use the negative PID value to kill whole process groups. See the kill command documentation for more info.
    sudo kill -3 -$app_pid
else
    echo "Aucun process ${APP} trouvé."
fi
