#!/bin/bash

# Script to start MongoDB
echo "Starting MongoDB..."

# Try to start via brew services first
if brew services start mongodb-community@6.0 2>/dev/null; then
    echo "MongoDB started via brew services"
    sleep 2
    brew services list | grep mongodb
elif brew services start mongodb-community 2>/dev/null; then
    echo "MongoDB started via brew services (without version)"
    sleep 2
    brew services list | grep mongodb
else
    echo "Brew service failed, trying direct start..."
    echo "Run this command manually in a separate terminal:"
    echo "mongod --config /usr/local/etc/mongod.conf"
    echo ""
    echo "Or simply:"
    echo "mongod"
fi
