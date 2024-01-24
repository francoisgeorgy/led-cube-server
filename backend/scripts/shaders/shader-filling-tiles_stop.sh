#!/bin/bash

kill -3 -$(pgrep -f 'shader-filling-tiles_start.sh' | head -1)