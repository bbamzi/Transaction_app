const Transaction = require("./../model/transactionModel");
const catchAsync = require("./../util/catchAsync");

// ##########################################  METHODS ##############################################

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

// ##########################################  CONTROLLERS ###########################################

// ********************************************* GET ADD TRANSACTIONS
exports.getAddTransaction = (req, res, next) => {
  res.render("transactions/index", {
    pageTitle: "New Transaction",
    currentView: "addTransaction",
  });
};

// ********************************************* POST ADD TRANSACTIONS
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
    invoice_account_number,
    invoice_account_name,
    invoice_bank_Name,
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
    userId: req.session.isLoggedIn ? req.session.user._id : null,
  });

  const invoiceTransaction = new Transaction({
    serviceType,
    logo,
    brandName,
    dateIssued,
    documentNumber,
    billTo,
    dueDate,
    paymentMethod: paymentMethod === "other" ? paymentIfOther : paymentMethod,
    invoice_account_number,
    invoice_account_name,
    invoice_bank_Name,
    items: itemPopulate(description, unit, price),
    currency,
    shippingFee,
    vat,
    discount,
    sub_total,
    total,
    clientSignature,
    userId: req.session.isLoggedIn ? req.session.user._id : null,
  });

  const transaction =
    serviceType === "Receipt" ? recieptTransaction : invoiceTransaction;

  if (req.session.isLoggedIn) {
    transaction
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {});
  }

  res.redirect("/");
};

// ********************************************* GET  TRANSACTIONS
exports.getTransactions = async (req, res, next) => {
  const transactions = await Transaction.find({
    userId: req.user._id,
  }).populate("userId");
  res.render("transactions/transactions", {
    transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
};

// ********************************************* GET EDIT  TRANSACTIONS
exports.getEditTransaction = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  try {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId: req.user._id,
    });
    res.render("transactions/index", {
      currentView: "editTransaction",
      transaction,
      pageTitle: transaction.documentNumber,
    });
  } catch {
    res.render("transactions/authError", {
      pageTitle: "Authorization Error,",
    });
  }
};
// ********************************************* POST EDIT  TRANSACTIONS
exports.postEditTransaction = async (req, res, next) => {
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
    invoice_account_number,
    invoice_account_name,
    invoice_bank_Name,
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
    } else {
      t.invoice_account_number = invoice_account_number;
      t.invoice_account_name = invoice_account_name;
      t.invoice_bank_Name = invoice_bank_Name;
      t.dueDate = dueDate; //invoice
      t.billTo = billTo;
    }
    return t;
  };

  const transaction = await Transaction.findOne({
    _id: req.body.transactionId,
    userId: req.user._id,
  });

  const transactions = getT(transaction);

  await transactions.save();
  res.redirect("/transactions");
};
// ********************************************* POST DELETE TRANSACTIONS
exports.postDeleteTransaction = async (req, res, next) => {
  const transactionId = req.body.transactionId;

  await Transaction.deleteOne({
    _id: transactionId,
    userId: req.user._id,
  });

  res.redirect("/transactions");
};
