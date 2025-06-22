const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventorySchema');
const { body, validationResult } = require('express-validator');

// Middleware for validating request data
const validateInventoryItem = [
  body('itemName').isString().notEmpty().withMessage('Item name is required'),
  body('itemCategory').isString().notEmpty().withMessage('Item category is required'),
  body('itemDescription').isString().optional(),
  body('sku').isString().notEmpty().withMessage('SKU is required'),
  body('stockInformation').isObject().withMessage('Stock information is required'),
  body('supplierInformation').isObject().withMessage('Supplier information is required'),
  body('storageInformation').isObject().withMessage('Storage information is required'),
  body('additionalInformation').isObject().optional(),
];

// Create a new inventory item
router.post('/inventory', validateInventoryItem, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { instituteId, inventoryItem } = req.body;

    // Create new inventory item
    const newItem = new Inventory({
      ...inventoryItem,
      LoginID: instituteId, // Assuming the `instituteId` is the Login ID
    });

    await newItem.save();
    res.status(201).json({ message: 'Inventory item added successfully!' });
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update an existing inventory item
router.put('/inventory/:id', validateInventoryItem, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the inventory item
    const updatedItem = await Inventory.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Inventory item not found.' });
    }

    res.status(200).json({ message: 'Inventory item updated successfully!', updatedItem });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Delete an inventory item
router.delete('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the inventory item
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Inventory item not found.' });
    }

    res.status(200).json({ message: 'Inventory item deleted successfully!' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get inventory items by institute ID
// Get inventory items by institute ID
router.get('/inventory/:instituteId', async (req, res) => {
    try {
      const { instituteId } = req.params;
  
      // Find inventory items by institute ID and select required fields
      const items = await Inventory.find({ LoginID: instituteId })
        .select('itemName itemCategory sku stockInformation quantity reorderLevel batchDetails.itemNumber batchDetails.expiryDate itemDescription supplierInformation supplierName storageInformation storageLocation additionalInformation notes');
  
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  module.exports = router;

module.exports = router;
