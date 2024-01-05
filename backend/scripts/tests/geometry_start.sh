#!/bin/bash

cd /home/cube/emulator || exit

source /home/cube/emulator/.venv/bin/activate

APP="cube_layout"

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/samples/${APP}.py \
    --led-slowdown-gpio 5 \
    --led-rows=64 --led-cols=64 \
    --led-chain 3 --led-parallel 2 \
    --led-brightness 50 \
    --led-pixel-mapper=Cube &

#echo $! | sudo tee /home/cube/emulator/${APP}.pid
#echo "PID is $(cat /home/cube/emulator/${APP}.pid)"

