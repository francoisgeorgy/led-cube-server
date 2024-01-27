#!/bin/bash

cd /home/cube/server/backend || exit

source /home/cube/.venv/bin/activate

python src/server.py --logfile - >> /home/cube/logs/server.log 2>&1 &
