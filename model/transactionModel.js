const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
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
  paymentIfOther: { type: String, trim: true },
  invoicePaymentDetails: { type: String, trim: true },
  items: [{ description: String, unit: Number, price: Number }],
  currency: { country: String, symbol: String },
  shippingFee: { type: Number },
  vat: { type: Number },
  discount: { type: Number },
  sub_total: { type: Number },
  total: { type: Number },
  clientSignature: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
