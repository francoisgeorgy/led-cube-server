#!/bin/bash

APP="src/server.py"

cd /home/cube/server/backend || exit

source /home/cube/server/backend/.venv/bin/activate

python ${APP} 2> /dev/null &

app_pid=$(pgrep -f "${APP}" | tail -n 1)

echo "server started with PID ${app_pid}"
