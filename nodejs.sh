#!/bin/bash
#set -c
while true; do echo starting; /usr/local/bin/node /var/www/server.js; exit_value="$?" ; echo stopping; if [ "$exit_value" != "0" ]; then sleep 2; fi ; sleep 1; done;
#while true; do /usr/local/bin/node /var/www/jsdatasvc.js 2>&1 >> /var/log/nodejs.log; sleep 1; done;
