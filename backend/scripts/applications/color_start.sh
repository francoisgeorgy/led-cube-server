#!/bin/bash

cd /home/cube/python || exit

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/examples/websockets_color.py \
    --led-slowdown-gpio 5 \
    --led-rows=64 --led-cols=64 \
    --led-chain 3 --led-parallel 2 \
    --led-brightness 66 \
    --led-pixel-mapper=Cube

#echo $! | sudo tee /home/cube/python/websockets_color.pid
#echo "PID is $(cat /home/cube/python/websockets_color.pid)"
