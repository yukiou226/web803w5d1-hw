# MongoDB Setup Instructions

## Start MongoDB

Your MongoDB data directory is configured at: `/usr/local/var/mongodb`

### Option 1: Start via Homebrew (Recommended)
```bash
brew services start mongodb-community@6.0
```

Verify it's running:
```bash
brew services list | grep mongodb
```

### Option 2: Start MongoDB directly
```bash
mongod --config /usr/local/etc/mongod.conf
```

### Option 3: If you get permission errors

The data directory might have wrong permissions. Fix them:
```bash
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb
```

Then start MongoDB:
```bash
mongod --config /usr/local/etc/mongod.conf
```

## Test MongoDB Connection

After starting MongoDB, test it:
```bash
mongosh --eval "db.adminCommand('ping')"
```

Should return: `{ ok: 1 }`

## Start Node Server

Once MongoDB is running:
```bash
npm start
```

You should see:
- `Database connection successful`
- `Server is running on port 8080`

## Troubleshooting

- **ECONNREFUSED error**: MongoDB is not running. Start it first.
- **Permission denied**: Fix permissions on `/usr/local/var/mongodb` and `/usr/local/var/log/mongodb`
- **Port already in use**: Another MongoDB instance might be running. Check with `lsof -i :27017`
