#!/bin/bash

# TODO: voir rubik-websockets_stop.sh

APP='websockets_dice.py'

app_pid=$(pgrep -f "$APP" | tail -n 1)
if [ -n "$app_pid" ]; then
#    echo "$APP PID is: $app_pid"
    sudo kill -9 $app_pid
else
    echo "Aucun process $APP trouvé."
fi
