const mongoose = require('mongoose');
const Inventory = require('./inventory.model.js');

exports.createInventory = (req, res) => {
  const inventory = new Inventory(req.body);
  inventory
    .save()
    .then(() => {
      res.status(200).json({ message: 'Inventory created successfully' });
    })
    .catch((err) => {
      res.status(400).send('Failed to create inventory: ' + err);
    });
};

exports.getInventory = (req, res) => {
  Inventory.findById(req.params.id)
    .then((inventory) => {
      if (!inventory) {
        return res.status(404).send('Inventory not found');
      }
      res.json(inventory);
    })
    .catch((err) => {
      res.status(500).send('Error retrieving inventory: ' + err);
    });
};

exports.inventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    console.log(`Found ${inventories.length} inventories`);
    res.json(inventories);
  } catch (err) {
    console.error('Error retrieving inventories:', err);
    res.status(500).send('Error retrieving inventories: ' + err);
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const result = await Inventory.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).send('Inventory not found');
    }
    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (err) {
    res.status(500).send('Error deleting inventory: ' + err);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.body._id);
    if (!inventory) {
      return res.status(404).send('Inventory not found');
    }
    inventory.prodname = req.body.prodname;
    inventory.qty = req.body.qty;
    inventory.price = req.body.price;
    inventory.status = req.body.status;
    await inventory.save();
    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).send('Error updating inventory: ' + err);
  }
};
