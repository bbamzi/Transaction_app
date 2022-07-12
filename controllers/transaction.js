const Transaction = require("./../model/transactionModel");

exports.getAddTransaction = (req, res, next) => {
  res.render("index", {
    pageTitle: "New Transaction",
  });
};

exports.postAddTransaction = (req, res, next) => {
  const serviceType = req.body.serviceType;
  const id_number = req.body.id_number;
  const recipientName = req.body.recipientName;
  const recipientAddress = req.body.recipientAddress;
  const transactionDate = req.body.transactionDate;
  const dueDate = req.body.dueDate;
  const paymentMethod = req.body.paymentMethod;
  const items = req.body.items;
  const currency = req.body.currency;
  const shippingFee = req.body.shippingFee;
  const vat = req.body.vat;
  const discount = req.body.discount;
  const total = req.body.total;
  const clientSignature = req.body.clientSignature;
  const logo = req.body.logo;
  const seller_name = req.body.seller_name;

  const transaction = new Transaction({
    serviceType,
    logo,
    id_number,
    seller_name,
    recipientName,
    recipientAddress,
    transactionDate,
    dueDate,
    paymentMethod,
    items,
    currency,
    shippingFee,
    vat,
    discount,
    total,
    clientSignature,
  });
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

exports.getTransactions = (req, res, next) => {
  res.render("transactions", {
    transactions: transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
};
// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
