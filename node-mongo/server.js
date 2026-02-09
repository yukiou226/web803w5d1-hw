const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventoryRouter = require('./inventory.router.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(inventoryRouter);

const db = process.env.DATABASE || 'mongodb://localhost:27017/react-crud';

console.log('Attempting to connect to MongoDB at:', db.replace(/\/\/.*@/, '//***@')); // Hide credentials if any

mongoose
  .connect(db, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Database connection successful');
    // Start server only after database connection is established
    app.listen(port, () => {
      console.log('Server is running on port ' + port);
    });
  })
  .catch((err) => {
    console.log('Database connection error: ' + err);
    console.log('Make sure MongoDB is running: mongod or brew services start mongodb-community');
    process.exit(1);
  });
