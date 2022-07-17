// ###########################################################     Modules      #######################################
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const transactionRoute = require("./routes/transaction");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(transactionRoute);
// app.use(errorRoute);

app.use(errorController.get404);
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// app.listen(3000);
