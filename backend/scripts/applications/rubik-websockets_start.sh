#!/bin/bash

cd /home/cube/python || exit

# source /home/cube/python/.venv/bin/activate

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/examples/rubik/websockets_rubik.py \
    --led-slowdown-gpio 5 \
    --led-rows=64 --led-cols=64 \
    --led-chain 3 --led-parallel 2 \
    --led-brightness 30 \
    --led-pixel-mapper=Cube >> /home/cube/logs/rubik.log 2>&1 &

#echo $! | sudo tee /home/cube/python/websockets_rubik.pid
#echo "PID is $(cat /home/cube/python/websockets_rubik.pid)"
