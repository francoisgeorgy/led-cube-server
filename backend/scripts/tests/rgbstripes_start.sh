#!/bin/bash

cd /home/cube/python || exit

# source /home/cube/python/.venv/bin/activate

APP="rgb3d-stripes"

# TODO: remove arguments which are default values
sudo -E env PATH=$PATH python src/examples/${APP}.py  &

#echo $! | sudo tee /home/cube/python/${APP}.pid
#echo "PID is $(cat /home/cube/python/${APP}.pid)"

