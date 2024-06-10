#!/bin/bash

#/home/cube/shaders/run.sh /home/cube/shaders/scripts/space.glsl

export EGL_PLATFORM=surfaceless
export MESA_GL_VERSION_OVERRIDE=3.3

LEDCAT="/home/cube/rpi-rgb-led-matrix/examples-api-use/ledcat"
SHADY="~/.local/share/go/bin/shady"

script="/home/cube/shaders/scripts/space.glsl"

$SHADY -ofmt rgb24 -g 192x128 -f 20 -i "${script}" \
    | sudo $LEDCAT \
        --led-rows=64 --led-cols=64 --led-slowdown-gpio=5 \
        --led-parallel=2 --led-chain=3 --led-brightness=65
