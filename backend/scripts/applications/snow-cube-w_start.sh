#!/bin/bash

app_pid=$(pgrep -f "snow_cube_param" | tail -n 1)
if [ -n "$app_pid" ]; then
    sudo kill -9 $app_pid
    sleep 1
fi

sudo /home/cube/led-matrix-cube-cpp/cmake-build-debug-pi-de-e0/snow_cube_param_shake -w

#echo $! | sudo tee /home/cube/${APP}.pid
#echo "PID is $(cat /home/cube/${APP}.pid)"
