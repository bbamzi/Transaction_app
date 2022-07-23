// ###########################################################     Modules      #######################################
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes/transaction");
const authenticationRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const User = require("./model/userModel");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
const store = new MongoDbStore({
  uri: process.env.DATABASE_LOCAL,
  collection: "sessions",
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secretssss",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(transactionRoutes);
app.use(authenticationRoutes);
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
