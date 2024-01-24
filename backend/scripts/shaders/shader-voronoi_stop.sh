#!/bin/bash

kill -3 -$(pgrep -f 'shader-voronoi_start.sh' | head -1)
