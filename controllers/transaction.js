const Transaction = require("./../model/transactionModel");

exports.getAddTransaction = (req, res, next) => {
  res.render("index", {
    pageTitle: "New Transaction",
  });
};

exports.postAddTransaction = (req, res, next) => {
  const {
    serviceType,
    logo,
    brandName,
    dateIssued,
    dueDate,
    documentNumber,
    recipientName,
    billTo,
    paymentMethod,
    paymentIfOther,
    invoicePaymentDetails,
    description,
    unit,
    price,
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
  } = req.body;
  // const serviceType = req.body.serviceType;
  // const logo = req.body.logo;
  // const brandName = req.body.brandName;
  // const dateIssued = req.body.dateIssued;
  // const dueDate = req.body.dueDate;
  // const documentNumber = req.body.documentNumber;
  // const recipientName = req.body.recipientName;
  // const billTo = req.body.billTo;
  // const paymentMethod = req.body.paymentMethod;
  // const paymentIfOther = req.body.paymentIfOther;
  // const invoicePaymentDetails = req.body.invoicePaymentDetails;
  // const description = req.body.description;
  // const unit = req.body.unit;
  // const price = req.body.price;
  // const currency = req.body.currency;
  // const shippingFee = req.body.shippingFee;
  // const vat = req.body.vat;
  // const discount = req.body.discount;
  // const sub_total = req.body.sub_total;
  // const total = req.body.total;
  // const clientSignature = req.body.clientSignature;
  const listItems = [description, unit, price];
  listItems.forEach((ele) => {});
  let itemsObj = {
    description: String(description),
    unit: +unit,
    price: +price,
  };
  console.log(listItems);
  const transaction = new Transaction({
    serviceType,
    logo,
    brandName,
    dateIssued,
    dueDate,
    documentNumber,
    recipientName,
    billTo,
    paymentMethod,
    paymentIfOther,
    invoicePaymentDetails: invoicePaymentDetails.toString(),
    items: itemsObj,
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
  });
  console.log(transaction);

  console.log(req.body);
  // transaction
  //   .save()
  //   .then((result) => {
  //     console.log("Created Transaction");
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const transactions = [];
exports.getTransactions = (req, res, next) => {
  res.render("transactions", {
    transactions: transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
};
// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
