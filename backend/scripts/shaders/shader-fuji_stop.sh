#!/bin/bash

kill -3 -$(pgrep -f 'shader-fuji_start.sh' | head -1)