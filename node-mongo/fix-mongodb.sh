#!/bin/bash

echo "Fixing MongoDB service..."

# Stop any existing MongoDB service
brew services stop mongodb-community@6.0 2>/dev/null || true

# Remove the corrupted launch agent
rm -f ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community@6.0.plist

# Unload if still loaded
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mongodb-community@6.0.plist 2>/dev/null || true

# Fix permissions on data directory
echo "Fixing permissions..."
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb

echo ""
echo "Now try starting MongoDB directly:"
echo "  mongod --config /usr/local/etc/mongod.conf"
echo ""
echo "Or in a separate terminal, run:"
echo "  mongod"
echo ""
echo "Keep that terminal open while MongoDB is running."
