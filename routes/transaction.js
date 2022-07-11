const express = require('express');
const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.render('index', {
    pageTitle: 'New Transaction',
  });
});

Router.post('/', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

Router.get('/transactions', (req, res, next) => {
  const transactions = [];
  res.render('transactions', {
    transactions: transactions,
    pageTitle: 'All Transactions',
    hasTransactions: transactions > 0,
  });
});
module.exports = Router;
