#!/bin/bash
   
while true;
 do 
 
  echo starting;

  script_directory=`dirname "$0"`;
  cd $script_directory;
  
  /usr/local/bin/node server.js;

  exit_value="$?" ;
  echo stopping;
   
  if [ "$exit_value" != "0" ]; then 
   sleep 3;
  else 
   sleep 1;
  fi ;

 done;
