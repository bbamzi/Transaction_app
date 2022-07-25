const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");
const middleware = require("./../middleware/middleware");

// index page(to view form)
router.get("/", transactionController.getAddTransaction);

// index page(to post form)
router.post("/", transactionController.postAddTransaction);

router.get(
  "/transactions",
  middleware.isAuthenticated,
  transactionController.getTransactions
);

router.get(
  "/transaction/:transactionId",
  middleware.isAuthenticated,
  transactionController.getEditTransaction
);
router.post(
  "/transaction",
  middleware.isAuthenticated,
  transactionController.postEditTransaction
);

router.post(
  "/delete-transaction/",
  middleware.isAuthenticated,
  transactionController.postDeleteTransaction
);

module.exports = router;
