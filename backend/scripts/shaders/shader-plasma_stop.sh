#!/bin/bash

kill -3 -$(pgrep -f 'shader-plasma_start.sh' | head -1)