#!/bin/bash

cd /home/Cloud/ || exit

sudo chown csye6225:csye6225 webapp -R 

cd /home/Cloud/webapp/ || exit

sudo npm install 

echo "NPM packages installed successfully."

echo "sleep start"

sleep 15m


