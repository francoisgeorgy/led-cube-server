#!/bin/bash

kill -3 -$(pgrep -f 'shader.*\.sh' | head -1)
sudo pkill -9 -f "websockets_.*.py"
