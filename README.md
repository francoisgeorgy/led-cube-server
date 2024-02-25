LED Cube - Remote control
=========================

To be documented...

Checkout the [main repository](https://github.com/francoisgeorgy/led-cube) to get more information about the LED Cube.

## OS tuning

Remove password for sudo. The file `/etc/sudoers.d/010_pi-nopasswd` must contains 
    
    pyxis ALL=(ALL) NOPASSWD: ALL

Add in ~/.bashrc : 

    alias act='. .venv/bin/activate'

## Installation

    cd /home/cube
    source .venv/bin/activate

    mkdir /home/cube/server
    cd /home/cube/server
    git clone https://github.com/francoisgeorgy/led-cube-server.git .

    git checkout rc1
    
    # pip install bottle ifaddr    

    mkdir /home/cube/server/config
    cd /home/cube/server/config

    nano config.development.json

```
{
    "debug_mode": true,
    "scripts_dir": "/home/cube/server/backend/scripts",
    "front_end": "/home/cube/server/frontend/dist"
}
```

    mkdir /home/cube/logs
    chmod a+rwX /home/cube/logs

    cd /home/cube
    ln -s server/backend/start-server.sh
    ln -s server/backend/stop-server.sh

    nano /home/cube/startup.sh

```
#!/bin/bash
source /home/cube/.venv/bin/activate
cd /home/cube/server/backend
python src/server.py -v >> /home/cube/logs/server.log 2>&1
```
    
    chmod +x startup.sh    

# TODO: review config file emplacement


    cd /home/cube/server/backend
    python src/server.py --logfile -








## Build frontend

TODO

## Credits

TODO



