#!/bin/bash

sudo dnf module install postgresql:15/server -y
sudo dnf module install nodejs:16/common -y

sudo node -v
sudo npm -v

sudo postgresql-setup --initdb

sudo sed -i 's/host    all             all             127.0.0.1\/32            ident/host    all             all             127.0.0.1\/32            password/g' /var/lib/pgsql/data/pg_hba.conf
sudo sed -i 's/host    all             all             ::1\/128                 ident/host    all             all             ::1\/128                 password/g' /var/lib/pgsql/data/pg_hba.conf

sudo systemctl start postgresql
sudo systemctl enable postgresql
