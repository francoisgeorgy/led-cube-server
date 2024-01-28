#!/bin/bash

cd /home/cube/python || exit

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/samples/startup_infos.py \
    --led-slowdown-gpio 5 \
    --led-rows=64 --led-cols=64 \
    --led-chain 3 --led-parallel 2 \
    --led-brightness 60 \
    --led-pixel-mapper=Cube
