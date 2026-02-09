const express = require('express');
const router = express.Router();
const controller = require('./inventory.controller.js');

// POST /api/inventory - create a new inventory
router.post('/api/inventory', controller.createInventory);

// GET /api/inventory/:id - retrieve one inventory by id
router.get('/api/inventory/:id', controller.getInventory);

// GET /api/inventories - retrieve all inventories
router.get('/api/inventories', controller.inventories);

// PUT /api/inventory - update an inventory
router.put('/api/inventory', controller.updateInventory);

// DELETE /api/inventory/:id - remove an inventory by id
router.delete('/api/inventory/:id', controller.deleteInventory);

module.exports = router;
