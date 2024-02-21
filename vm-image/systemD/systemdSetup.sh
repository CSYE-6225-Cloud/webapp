#!/bin/bash

sudo cp /tmp/systemdService.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable systemdService
