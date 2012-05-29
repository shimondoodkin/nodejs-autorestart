#!/bin/bash
   
while true;
 do 
 
  echo starting $(date);

  script_directory=`dirname "$0"`;
  cd $script_directory;
  
  #touch /var/log/nodejs.log
  #chmod 777 /var/log/nodejs.log
  #
  # echo "bla" > file.txt # replaces file
  # echo "bla" >> file.txt # appends to file
  #
  # /usr/bin/env node autorestart.js $* > /var/log/nodejs.log 2>&1;

  /usr/bin/env node autorestart.js $*

  exit_value="$?" ;
  echo stopping $(date);
   
  if [ "$exit_value" != "0" ]; then 
   sleep 1;
  else 
   sleep 0.5;
  fi ;

 done;
