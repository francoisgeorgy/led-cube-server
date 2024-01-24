#!/bin/bash

kill -3 -$(pgrep -f 'shader-voronoi-3d_start.sh' | head -1)