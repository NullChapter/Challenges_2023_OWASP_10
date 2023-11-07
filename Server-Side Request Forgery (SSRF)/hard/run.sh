#!/bin/bash
python -m http.server 1729 --bind 127.0.0.1 --directory ./flag &
P1=$!
node app.js
P2=$!
wait $P1 $P2