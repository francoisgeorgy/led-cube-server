#!/bin/bash

APP="src/server.py"

app_pid=$(pgrep -f "${APP}" | tail -n 1)

if [ -n "$app_pid" ]; then
    echo "${APP} PID is $app_pid"
    # TODO: find a better way to stop the server
    sudo kill -9 $app_pid
#    echo "process $app_pid killed"
else
    echo "Aucun process ${APP} trouvé."
    exit 1
fi
