#!/bin/bash

kill -3 -$(pgrep -f 'shader-tesseract_start.sh' | head -1)