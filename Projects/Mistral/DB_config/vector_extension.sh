#!/usr/bin/bash

# Install Git & tools to build pgvector
# Note: Check for new versions of Postress development files
apt-get update && apt-get install git build-essential postgresql-server-dev-17

# Build pgvector. Instructions at as per https://github.com/pgvector/pgvector)
# Note: Check for new versions of pgvector
cd /tmp || exit
git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git
cd pgvector || exit
make
make install