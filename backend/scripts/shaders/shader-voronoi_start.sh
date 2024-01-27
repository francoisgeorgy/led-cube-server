#!/bin/bash

#/home/cube/glsl/run.sh /home/cube/glsl/scripts/voronoi.glsl

export EGL_PLATFORM=surfaceless
export MESA_GL_VERSION_OVERRIDE=3.3

LEDCAT="/home/cube/rpi-rgb-led-matrix/examples-api-use/ledcat"
SHADY="/home/francois/.local/share/go/bin/shady"

script="/home/cube/glsl/scripts/voronoi.glsl"

$SHADY -ofmt rgb24 -g 192x128 -f 20 -i "${script}" \
    | sudo $LEDCAT \
        --led-rows=64 --led-cols=64 --led-slowdown-gpio=5 \
        --led-parallel=2 --led-chain=3 --led-brightness=65
