#!/bin/bash

env_values=$(cat <<END
PORT=$PORT
DB_NAME=$DB_NAME
DB_PASSWORD=$DB_PASSWORD
HOST=$HOST
DIALECT=$DIALECT
END
)

echo "$env_values" | sudo tee /home/Cloud/webapp .env >/dev/null

echo ".env file created"