#!/bin/bash

kill -3 -$(pgrep -f 'shader.*\.sh' | head -1)
#kill -3 -$(pgrep -f 'shader-munch_start.sh' | head -1)