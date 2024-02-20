#!/bin/bash

sudo groupadd csye6225
sudo adduser csye6225 --shell /usr/bin/nologin -g csye6225

cd /home/Cloud/ || exit

sudo chown csye6225:csye6225 webapp -R 

cd /home/Cloud/webapp/ || exit

sudo npm install 

echo "NPM packages installed successfully."




