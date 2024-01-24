#!/bin/bash

kill -3 -$(pgrep -f 'shader-conic_start.sh' | head -1)