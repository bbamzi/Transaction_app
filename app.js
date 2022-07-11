// ###########################################################     Modules      #######################################
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const transactionRoute = require('./routes/transaction');
const errorRoute = require('./routes/error');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(transactionRoute);
// app.use(errorRoute);

app.use((req, res, next) => {
  res.status(404).render('404');
});
app.listen(3000);
