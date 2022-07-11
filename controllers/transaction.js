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

exports.getTransactions = (req, res, next) => {
  res.render("transactions", {
    transactions: transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
};
// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
