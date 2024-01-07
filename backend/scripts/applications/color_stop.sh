#!/bin/bash

# TODO: voir rubik-websockets_stop.sh

APP='websockets_color.py'

app_pid=$(pgrep -f "$APP" | tail -n 1)
if [ -n "$app_pid" ]; then
    echo "$APP PID is: $app_pid"
    sudo kill -9 $app_pid
else
    echo "Aucun process $APP trouvé."
fi

#app_pid=$(pgrep -f "$APP" | head -n 1)
#if [ -n "$app_pid" ]; then
#    echo "$APP PID is: $app_pid"
#    # We use the negative PID value to kill whole process groups. See the kill command documentation for more info.
#    sudo kill -3 -$app_pid
#else
#    echo "Aucun process $APP trouvé."
#fi
