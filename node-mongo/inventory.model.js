const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  prodname: String,
  qty: Number,
  price: Number,
  status: String
}, { 
  collection: 'inventories', // Explicitly specify the collection name
  strict: false // Allow fields not defined in schema
}); 

module.exports = mongoose.model('Inventory', inventorySchema);
