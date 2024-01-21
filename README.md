LED Cube - Remove control
=========================

To be documented...

Checkout the [main repository](https://github.com/francoisgeorgy/led-cube) to get more information about the LED Cube.


## Installation

    mkdir /home/cube/server/{backend,frontend}
    cd /home/cube/server/backend
    python3 -m venv --system-site-packages .venv
    source .venv/bin/activate
    pip install -r requirements.txt

    mkdir config
    nano config.txt
    
    {
        "debug_mode": true,
        "scripts_dir": "/home/cube/server/backend/scripts",
        "front_end": "/home/cube/server/frontend/dist"
    }


## Build frontend



