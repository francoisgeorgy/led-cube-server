#!/bin/bash

kill -3 -$(pgrep -f 'shader-globe_start.sh' | head -1)