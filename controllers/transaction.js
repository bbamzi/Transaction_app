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

  console.log(documentNumberGenerator(autoGenerate));
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
    items: itemPopulate(description, unit, price),
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
  });

  transaction
    .save()
    .then((result) => {
      console.log("Created Transaction");
      res.redirect("/");
    })
    .catch((err) => {});
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
