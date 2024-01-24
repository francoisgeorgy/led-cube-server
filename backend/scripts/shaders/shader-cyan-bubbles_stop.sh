#!/bin/bash

kill -3 -$(pgrep -f 'shader-cyan-bubbles_start.sh' | head -1)