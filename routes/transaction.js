const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");

router.get("/", transactionController.getAddTransaction);

router.post("/", transactionController.postAddTransaction);

router.get("/transactions", (req, res, next) => {
  const transactions = [];
  res.render("transactions", {
    transactions: transactions,
    pageTitle: "All Transactions",
    hasTransactions: transactions > 0,
  });
});

module.exports = router;
