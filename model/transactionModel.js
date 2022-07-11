// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     timeStamp: { type: Date, default: Date.now },
//     serviceType: { type: String, required: [true, 'Service Type is Required'] },
//     id_number: {
//       type: String,
//       trim: true,
//       unique: [true, 'id already exists'],
//       required: [true, 'Id Reference is Required'],
//     },
//     serviceBusinessName: { type: String, trim: true },
//     recipientName: {
//       type: String,
//       trim: true,
//       required: [true, "Recepient's name  is Required"],
//     },
//     recipientAddress: { type: String, trim: true },
//     transactionDate: { type: Date },
//     dueDate: { type: Date },
//     paymentMethod: { type: String, trim: true },
//     items: [{ description: String, unit: Number, price: Number }],
//     currency: { country: String, symbol: String },
//     shippingFee: { type: Number },
//     vat: { type: Number },
//     discount: { type: Number },
//     total: { type: Number },
//     clientSignature: { type: String },
//     logo: { type: String },
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );
// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;
