const AppError = require("../util/appError");
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
exports.postAddTransaction = catchAsync(async (req, res, next) => {
  const getLogo = () => {
    const logo = req.file;
    if (!logo) {
      return "";
    } else {
      return logo.path;
    }
  };
  const transaction = new Transaction({
    serviceType: req.body.serviceType,
    logo: getLogo(),
    brandName: req.body.brandName,
    documentNumber: req.body.documentNumber,
    dateIssued: req.body.dateIssued,
    recipientName:
      req.body.serviceType === "Receipt" ? req.body.recipientName : null,
    billTo: req.body.serviceType === "Invoice" ? req.body.billTo : null,
    dueDate: req.body.serviceType === "Invoice" ? req.body.dueDate : null,
    paymentMethod:
      req.body.paymentMethod === "other"
        ? req.body.paymentIfOther
        : req.body.paymentMethod,
    items: itemPopulate(req.body.description, req.body.unit, req.body.price),
    invoice_account_number:
      req.body.serviceType === "Invoice"
        ? req.body.invoice_account_number
        : null,
    invoice_account_name:
      req.body.serviceType === "Invoice" ? req.body.invoice_account_name : null,
    invoice_bank_Name:
      req.body.serviceType === "Invoice" ? req.body.invoice_bank_Name : null,
    currency: req.body.currency,
    shippingFee: req.body.shippingFee,
    vat: req.body.vat,
    discount: req.body.discount,
    sub_total: req.body.sub_total,
    total: req.body.total,
    clientSignature: req.body.clientSignature,
    userId: req.session.isLoggedIn ? req.session.user._id : null,
  });
  if (req.session.isLoggedIn) {
    await transaction.save();
  }
  res.redirect("/");
});
// ********************************************* GET  TRANSACTIONS
exports.getTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({
    userId: req.user._id,
  }).populate("userId");

  if (!transactions) {
    return next(
      new AppError("You Are Not Authorized To Access This Page", 401)
    );
  }
  res.render("transactions/transactions", {
    transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
});

// ********************************************* GET EDIT  TRANSACTIONS
exports.getEditTransaction = catchAsync(async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId: req.user._id,
  });

  if (!transaction) {
    return next(new AppError("Transaction not found", 400));
  }

  res.render("transactions/index", {
    currentView: "editTransaction",
    transaction,
    pageTitle: transaction.documentNumber,
  });
});
// ********************************************* POST EDIT  TRANSACTIONS
exports.postEditTransaction = catchAsync(async (req, res, next) => {
  const getLogo = () => {
    const logo = req.file;
    if (!logo) {
      return "";
    } else {
      return logo.path;
    }
  };
  const transaction = await Transaction.findOne({
    _id: req.body.transactionId,
    userId: req.user._id,
  });
  const getT = function (t) {
    t.logo = req.file ? getLogo() : transaction.logo;
    t.brandName = req.body.brandName;
    t.dateIssued = req.body.dateIssued;
    t.documentNumber = req.body.documentNumber;
    t.items = itemPopulate(req.body.description, req.body.unit, req.body.price);
    t.currency = req.body.currency;
    t.shippingFee = req.body.shippingFee;
    t.vat = req.body.vat;
    t.discount = req.body.discount;
    t.sub_total = req.body.sub_total;
    t.total = req.body.total;
    t.clientSignature = req.body.clientSignature;

    if (req.body.serviceType === "Receipt") {
      t.recipientName = req.body.recipientName;
      t.paymentMethod =
        req.body.paymentMethod === "other"
          ? req.body.paymentIfOther
          : req.body.paymentMethod;
    } else {
      t.invoice_account_number = req.body.invoice_account_number;
      t.invoice_account_name = req.body.invoice_account_name;
      t.invoice_bank_Name = req.body.invoice_bank_Name;
      t.dueDate = req.body.dueDate; //invoice
      t.billTo = req.body.billTo;
    }
    return t;
  };

  const transactions = getT(transaction);

  await transactions.save();
  res.redirect("/transactions");
});
// ********************************************* POST DELETE TRANSACTIONS
exports.postDeleteTransaction = catchAsync(async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next(
      new AppError(
        "You Are Not Authorized For That Action, Please Log in .",
        403
      )
    );
  }
  const transactionId = req.body.transactionId;

  await Transaction.deleteOne({
    _id: transactionId,
    userId: req.user._id,
  });
  req.flash("success", "Successfully Deleted");
  req.session.messageType = "success";
  res.redirect("/transactions");
});
