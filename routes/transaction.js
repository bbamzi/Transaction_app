const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");
const isAuth = require("./../middleware/isAuth");

// index page(to view form)
router.get("/", transactionController.getAddTransaction);

// index page(to post form)
router.post("/", transactionController.postAddTransaction);

router.get(
  "/transactions",
  isAuth.isAuthenticated,
  transactionController.getTransactions
);

router.get(
  "/transaction/:transactionId",
  isAuth.isAuthenticated,
  transactionController.getEditTransaction
);
router.post(
  "/transaction",
  isAuth.isAuthenticated,
  transactionController.postEditTransaction
);

router.post(
  "/delete-transaction/",
  isAuth.isAuthenticated,
  transactionController.postDeleteTransaction
);

module.exports = router;
