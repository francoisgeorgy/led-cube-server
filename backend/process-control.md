Some notes about how to start and stop applications
===================================================

Feel free to send me remarks and corrections if what I say is wrong or can be done in a better way.


### tools :

    ps -efj

The -j option add the PGID column in the ps output. The PGID value is useful when we want to 
kill a whole process group by specifying a negative PID with the kill command. 

From the `man kill` page : 

> Negative PID values may be used to choose whole process groups; see the PGID column in ps command output.



shaders : 
---------

Started with something like : 

    shady -options... -i script.glsl | sudo ledcat -options...

To stop do : 

    kill -3 -<PGID>

with : 

    kill -3 -$(pgrep -f 'scripts/rgb.glsl' | head -1)


Check the processes with htop :
-------------------------------

    htop -t -s PID -F 'server.py|shaders|python|snow' 

