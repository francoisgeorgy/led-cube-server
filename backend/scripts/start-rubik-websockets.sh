#!/bin/bash

cd /home/cube/emulator || exit

source /home/cube/emulator/.venv/bin/activate

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/samples/rubik/websockets_rubik.py \
    --led-slowdown-gpio 5 \
    --led-rows=64 --led-cols=64 \
    --led-chain 3 --led-parallel 2 \
    --led-brightness 30 \
    --led-pixel-mapper=Cube &

echo $! | sudo tee /home/cube/emulator/websockets_rubik.pid

echo "PID is $(cat /home/cube/emulator/websockets_rubik.pid)"
