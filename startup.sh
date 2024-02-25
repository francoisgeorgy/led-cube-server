#!/bin/bash

cd /home/cube/server/backend || exit

source /home/cube/.venv/bin/activate

python src/server.py -v >> /home/cube/logs/server.log 2>&1

#sudo -E env PATH=$PATH python src/examples/cube_infos.py --led-slowdown-gpio 5 --led-rows=64 --led-cols=64 --led-chain 3 --led-parallel 2 --led-brightness 30 --led-pixel-mapper=Cube
