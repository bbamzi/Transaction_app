const transactions = [
  {
    user: {
      id: "62aeeb578f6bf834c04275a1",
    },
    timeStamp: {
      date: {
        numberLong: "1654698948164",
      },
    },
    serviceType: "invoice",
    id_number: "srfinv004",
    serviceBusinessName: "serrial Realty Forte",
    recipientName: "akinbode",
    recipientAddress: "19 atanda akinremi",
    transactionDate: {
      date: {
        $numberLong: "1646438400000",
      },
    },
    dueDate: {
      date: {
        numberLong: "1646438400000",
      },
    },
    paymentMethod: "Bank Transfer",
    items: [
      {
        description: "wncownconcwnv",
        unit: 2,
        price: 30000,
        _id: {
          id: "62ab20be32943fb93043fb37",
        },
      },
      {
        description: "feef3ff3ff3f3",
        unit: 4,
        price: 30000,
        _id: {
          id: "62ab20be32943fb93043fb38",
        },
      },
      {
        description: "r4g4rggregrgg",
        unit: 6,
        price: 54534,
        id: {
          id: "62ab20be32943fb93043fb39",
        },
      },
    ],
    currency: {
      country: "Nigeria",
      symbol: "₦",
    },
    shippingFee: 32443,
    vat: 3233,
    discount: -3223,
    total: 244234,
    clientSignature: "",
    __v: 0,
  },
];

module.exports = class Transaction {
  constructor(serviceType, total, recipientName) {
    this.serviceType = serviceType;
    this.total = total;
    this.recipientName = recipientName;
  }

  save() {
    transactions.push(this);
  }
};

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
