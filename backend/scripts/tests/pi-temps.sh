#!/bin/bash

# Display the ARM CPU and GPU temperature of Raspberry Pi
# -------------------------------------------------------
cpu=$(</sys/class/thermal/thermal_zone0/temp)
#echo "$(date) @ $(hostname)"
#echo "-------------------------------------------"
echo "GPU : $(vcgencmd measure_temp)"
echo "CPU : $((cpu/1000))'C"
