#!/bin/bash

sudo groupadd csye6225
sudo adduser csye6225 --shell /usr/bin/nologin -g csye6225

cd /home/Cloud/ || exit

sudo chown csye6225:csye6225 webapp -R 

cd /home/Cloud/webapp/ || exit

env_values=$(cat <<END
PORT=$PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
HOST=$HOST
DIALECT=$DIALECT
END
)

echo "$env_values" | sudo tee .env >/dev/null

sudo chown csye6225:csye6225 .env 

echo ".env file created"

sudo npm install 

echo "NPM packages installed successfully."




