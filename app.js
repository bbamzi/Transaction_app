// ###########################################################     Modules      #######################################
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const transactionRoute = require("./routes/transaction");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./model/userModel");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62d57aa8d7971813737a292d")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(transactionRoute);
// app.use(errorRoute);

app.use(errorController.get404);
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Akin",
          email: "test@io.com",
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// app.listen(3000);
