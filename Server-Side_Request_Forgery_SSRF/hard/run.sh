#!/bin/bash
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
python3 -m http.server 1729 --bind 127.0.0.1 --directory ./flag &
npm install
node app.js