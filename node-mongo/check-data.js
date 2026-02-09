// Quick script to check if data exists in MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.DATABASE || 'mongodb://localhost:27017/react-crud';

mongoose.connect(db)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if the inventories collection exists
    const db_conn = mongoose.connection.db;
    const collections = await db_conn.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach(col => console.log('  -', col.name));
    
    // Count documents in inventories collection
    const count = await db_conn.collection('inventories').countDocuments();
    console.log(`\nDocuments in 'inventories' collection: ${count}`);
    
    // Show first few documents
    if (count > 0) {
      const sample = await db_conn.collection('inventories').find().limit(3).toArray();
      console.log('\nSample documents:');
      console.log(JSON.stringify(sample, null, 2));
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
