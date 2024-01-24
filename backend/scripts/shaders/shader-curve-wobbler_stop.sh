#!/bin/bash

kill -3 -$(pgrep -f 'shader-curve-wobbler_start.sh' | head -1)