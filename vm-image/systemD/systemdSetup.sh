#!/bin/bash

sudo groupadd csye6225
sudo adduser csye6225 --shell /usr/bin/nologin -g csye6225

sudo cp /tmp/systemdService.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable systemdService
