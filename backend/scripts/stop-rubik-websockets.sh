#!/bin/bash

# TODO:
# - remplacer uvicorn par gunicorn
# - voir : https://www.uvicorn.org/#running-with-gunicorn
#          https://stackoverflow.com/questions/60424390/is-there-a-way-to-kill-uvicorn-cleanly
#          https://chat.openai.com/g/g-8iui73B2J-eliza/c/e4bcf210-38cd-49a4-a18f-d79534d1a952

#PID=$(cat /home/cube/emulator/websockets_rubik.pid)
#sudo kill $PID
#sudo rm /home/cube/emulator/websockets_rubik.pid

# Après avoir démarré, les process sont :
#
#    root      1176     1  0 10:57 pts/0    00:00:00 sudo -E env PATH=/home/cube/emulator/.venv/bin:/home/francois/.local/share/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games python src/samples/rubik/websockets_rubik.py --led-slowdown-gpio 5 --led-rows=64 --led-cols=64 --led-chain 3 --led-parallel 2 --led-brightness 30 --led-pixel-mapper=Cube
#    root      1180  1176  0 10:57 pts/2    00:00:00 sudo -E env PATH=/home/cube/emulator/.venv/bin:/home/francois/.local/share/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games python src/samples/rubik/websockets_rubik.py --led-slowdown-gpio 5 --led-rows=64 --led-cols=64 --led-chain 3 --led-parallel 2 --led-brightness 30 --led-pixel-mapper=Cube
#    daemon    1182  1180 63 10:57 pts/2    00:00:57 python src/samples/rubik/websockets_rubik.py --led-slowdown-gpio 5 --led-rows=64 --led-cols=64 --led-chain 3 --led-parallel 2 --led-brightness 30 --led-pixel-mapper=Cube
#
#    pgrep -f websockets_rubik.py
#    1176
#    1180
#    1182
#
#    PID=$(pgrep -f websockets_rubik.py | tail -1)
#
#    sudo kill -9 $PID

rubik_pid=$(pgrep -f 'websockets_rubik.py' | tail -n 1)

if [ -n "$rubik_pid" ]; then
    echo "Rubik PID is: $rubik_pid"
    sudo kill -9 $rubik_pid
else
    echo "Aucun process Rubik trouvé."
fi
