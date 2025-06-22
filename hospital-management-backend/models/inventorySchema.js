const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemDescription: { type: String },
  sku: { type: String, required: true },
  stockInformation: {
    quantity: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    batchDetails: [
      {
        batchNumber: { type: String, required: true },
        manufactureDate: { type: Date, required: true },
        expiryDate: { type: Date, required: true },
      }
    ]
  },
  supplierInformation: {
    supplierName: { type: String, required: true },
    supplierContact: { type: String, required: true },
    supplierEmail: { type: String },
    supplierAddress: { type: String }
  },
  storageInformation: {
    storageLocation: { type: String, required: true },
    storageConditions: { type: String }
  },
  additionalInformation: {
    notes: { type: String },
    enteredBy: { type: String, required: true },
  },
  LoginID: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);
