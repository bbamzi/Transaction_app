const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");

// index page(to view form)
router.get("/", transactionController.getAddTransaction);

// index page(to post form)
router.post("/", transactionController.postAddTransaction);

router.get("/transactions", transactionController.getTransactions);

router.get("/transaction/:transactionId", transactionController.getTransaction);

module.exports = router;
