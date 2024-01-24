#!/bin/bash

kill -3 -$(pgrep -f 'shader-rgb_start.sh' | head -1)
