// const Transaction = require('./../model/transactionModel');

exports.getAddTransaction = (req, res, next) => {
  res.render("index", {
    pageTitle: "New Transaction",
  });
};

exports.postAddTransaction = (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
};

// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
