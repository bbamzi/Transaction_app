const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeStamp: { type: Date, default: Date.now() },
  serviceType: { type: String },
  logo: { type: String },
  brandName: {
    type: String,
    trim: true,
  },
  dateIssued: { type: Date },
  dueDate: { type: Date },
  documentNumber: {
    type: String,
    trim: true,
  },
  recipientName: {
    type: String,
    trim: true,
  },
  billTo: {
    type: String,
    trim: true,
  },
  paymentMethod: { type: String, trim: true },
  invoice_account_number: { type: String, trim: true },
  invoice_account_name: { type: String, trim: true },
  invoice_bank_Name: { type: String, trim: true },
  items: { type: Array, default: [] },
  currency: { type: String },
  shippingFee: { type: Number },
  vat: { type: Number },
  discount: { type: Number },
  sub_total: { type: Number },
  total: { type: Number },
  clientSignature: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
