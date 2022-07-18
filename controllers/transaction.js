const Transaction = require("./../model/transactionModel");

exports.getAddTransaction = (req, res, next) => {
  res.render("index", {
    pageTitle: "New Transaction",
  });
};
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

  const recieptTransaction = new Transaction({
    serviceType,
    logo,
    brandName,
    dateIssued,
    dueDate,
    documentNumber,
    recipientName,
    paymentMethod: paymentMethod === "other" ? paymentIfOther : paymentMethod,
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
    paymentMethod: paymentMethod === "other" ? paymentIfOther : paymentMethod,
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
    .catch((err) => {});
};

exports.postEditTransaction = (req, res, next) => {
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

  const getT = function (t) {
    t.serviceType = serviceType;
    t.logo = logo;
    t.brandName = brandName;
    t.dateIssued = dateIssued;
    t.documentNumber = documentNumber;
    t.items = itemPopulate(description, unit, price);
    t.currency = currency;
    t.shippingFee = shippingFee;
    t.vat = vat;
    t.discount = discount;
    t.sub_total = sub_total;
    t.total = total;
    t.clientSignature = clientSignature;

    if (serviceType === "Receipt") {
      t.recipientName = recipientName;
      t.paymentMethod =
        paymentMethod === "other" ? paymentIfOther : paymentMethod;
      t.invoicePaymentDetails = invoicePaymentDetails.toString();
    } else {
      t.dueDate = dueDate; //invoice
      t.billTo = billTo;
    }
    return t;
  };

  Transaction.findById(req.body.transactionId)
    .then((transaction) => {
      console.log(getT(transaction));
      getT(transaction).save();
    })
    .then((result) => {
      res.redirect("/transactions");
    })
    .catch((err) => {});
};

exports.getEditTransaction = (req, res, next) => {
  const transactionId = req.params.transactionId;
  Transaction.findById(transactionId).then((transaction) => {
    res.render("transaction", {
      transaction,
      pageTitle: transaction.documentNumber,
    });
  });
};

exports.postDeleteTransaction = (req, res, next) => {
  const transactionId = req.body.transactionId;
  Transaction.findByIdAndDelete(transactionId).then(() => {
    res.redirect("/transactions");
  });
};
