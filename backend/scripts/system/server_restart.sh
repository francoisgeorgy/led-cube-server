#!/bin/bash

APP="src/server.py"

app_pid=$(pgrep -f "${APP}" | tail -n 1)

if [ -n "$app_pid" ]; then
    echo "${APP} PID is $app_pid"
    # TODO: find a better way to stop the server
    sudo kill -9 $app_pid
    echo "process $app_pid killed"
else
    echo "Aucun process ${APP} trouvé."
    exit 1
fi

echo "waiting 2 seconds"
sleep 2

cd /home/cube/server/backend || exit

source /home/cube/server/backend/.venv/bin/activate

python ${APP} 2> /dev/null &

app_pid=$(pgrep -f "${APP}" | tail -n 1)

echo "server started with PID ${app_pid}"

