#!/bin/bash

kill -3 -$(pgrep -f 'shader-blorps_start.sh' | head -1)