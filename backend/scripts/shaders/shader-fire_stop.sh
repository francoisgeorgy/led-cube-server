#!/bin/bash

kill -3 -$(pgrep -f 'shader-fire_start.sh' | head -1)