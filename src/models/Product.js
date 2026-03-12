const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Food', 'Furniture', 'Other'],
      default: 'Other',
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    quantityInStock: {
      type: Number,
      min: [0, 'Quantity cannot be negative'],
      required: true,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      min: [1, 'Reorder level must be greater than 0'],
      required: true,
    },
    unitPrice: {
      type: Number,
      min: [0.01, 'Unit price must be a positive value'],
      required: true,
    },
    manufactureDate: {
      type: Date,
    },
    productType: {
      type: String,
      enum: ['Perishable', 'Non-Perishable'],
      default: 'Non-Perishable',
    },
    status: {
      type: String,
      enum: ['Available', 'Out of Stock'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
