start python -m http.server 1729 --bind 127.0.0.1 --directory ./flag
timeout /t 2 > nul
start node app.js
