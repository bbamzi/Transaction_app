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
    autoGenerate,
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

  const itemPopulate = (description, unit, price) => {
    const itemObj = [];
    if (typeof description === "string") {
      itemObj.push({ description, unit, price });
    } else {
      for (let index = 0; index < description.length; index++) {
        const item = {
          description: description[index],
          unit: unit[index],
          price: price[index],
        };
        itemObj.push(item);
      }
    }
    return itemObj;
  };
  const paymentMethodSetter =
    paymentMethod === "other" ? paymentIfOther : paymentMethod;

  const recieptTransaction = new Transaction({
    serviceType,
    logo,
    brandName,
    dateIssued,
    dueDate,
    documentNumber,
    recipientName,
    paymentMethod: paymentMethodSetter,
    items: itemPopulate(description, unit, price),
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
  });

  const invoiceTransaction = new Transaction({
    serviceType,
    logo,
    brandName,
    dateIssued,
    documentNumber,
    billTo,
    paymentMethod: paymentMethodSetter,
    invoicePaymentDetails: invoicePaymentDetails.toString(),
    items: itemPopulate(description, unit, price),
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
  });
  const transaction =
    serviceType === "Receipt" ? recieptTransaction : invoiceTransaction;

  transaction
    .save()
    .then((result) => {
      console.log("Created Transaction");
      res.redirect("/");
    })
    .catch((err) => {});
};

exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      res.render("transactions", {
        transactions,
        pageTitle: "All Transactions",
        hasTransactions: transactions > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req);
};

exports.getTransaction = (req, res, next) => {
  const transactionId = req.params.transactionId;
  Transaction.findById(transactionId).then((transaction) => {
    res.render("transaction", {
      transaction,
      pageTitle: transaction.documentNumber,
    });
  });
};
// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
