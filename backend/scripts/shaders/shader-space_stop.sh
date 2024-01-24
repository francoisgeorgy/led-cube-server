#!/bin/bash

kill -3 -$(pgrep -f 'shader-space_start.sh' | head -1)