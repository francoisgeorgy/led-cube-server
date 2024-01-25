#!/bin/bash

cd /home/cube/server/backend || exit

source /home/cube/.venv/bin/activate

python src/server.py -v >> /home/cube/logs/server.log 2>&1


