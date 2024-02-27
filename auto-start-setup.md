TODO at startup:

- display battery voltage & current
- display temperature
- display orientation
- display menu


## Run a Program On Your Raspberry Pi At Startup

https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup/introduction

## systemd

**https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup/method-3-systemd**

### systemd howto : 

Create the file `/lib/systemd/system/cube.service` with : 

```
[Unit]
Description=Cube Service
After=network.target

[Service]
Type=idle
ExecStart=/home/cube/server/backend/start-server-with-application.sh

StandardOutput=append:/home/cube/logs/cube.service.log
StandardError=append:/home/cube/logs/cube.service.log

[Install]
WantedBy=multi-user.target
```

Load the service configuration : 

    sudo systemctl daemon-reload

Start on boot :

    sudo systemctl enable cube.service
    Created symlink /etc/systemd/system/multi-user.target.wants/cube.service → /lib/systemd/system/cube.service.

Disable running on boot : 

    sudo systemctl disable cube.service

Check status : 

    systemctl status cube.service

Start / Stop : 

    sudo systemctl start cube.service
    sudo systemctl stop cube.service

## How to stop the startup display 

    sudo systemctl stop cube.service



## Obsolete 

### init.d

https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/#init

### rc.local

https://raspberrypi-guide.github.io/programming/run-script-on-boot

Uses /etc/rc.local. 

Very simple but *obsolete*. 

https://askubuntu.com/questions/922730/rc-local-vs-upstart-vs-systemd : 

> To start off, your product shouldn't use rc.local at all. rc.local is for the system administrator to fiddle with; 
> they can do whatever they want with it (as long as it exits successfully). This makes editing it tricky at best.





## See also

- https://askubuntu.com/questions/922730/rc-local-vs-upstart-vs-systemd

