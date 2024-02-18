#!/bin/bash

sudo -u postgres psql -c "CREATE USER payalk WITH PASSWORD 'payalk';"
sudo -u postgres createdb clouddb --owner=payalk
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE clouddb TO payalk;"

