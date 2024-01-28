#!/bin/bash

APP="snow_cube_param_shake"

app_pid=$(pgrep -f "${APP}" | tail -n 1)

if [ -n "$app_pid" ]; then
    echo "${APP} PID is: $app_pid"
    sudo kill -9 $app_pid
#    echo "${APP} killed"
else
    echo "Aucun process ${APP} trouvé."
fi
