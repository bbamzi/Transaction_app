// ###########################################################     Modules      #######################################
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const AppError = require("./util/appError");
const multer = require("multer");
const globalErrorHandler = require("./controllers/error");
const transactionRoutes = require("./routes/transaction");
const authenticationRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const User = require("./model/userModel");

// #################################### Environment Variables
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// ################################### Initialize APP
const app = express();

// #################################### Storing Variables in MongoDB
const store = new MongoDbStore({
  uri: process.env.DATABASE_LOCAL,
  collection: "sessions",
});

// ##################### Enables Express Know which Template and which folder it is
app.set("view engine", "pug");
app.set("views", "views");

// # body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "secretssss",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// ##multer

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
app.use(multer({ storage: fileStorage, fileFilter }).single("logo"));

// ####################### Csrf Protection Middleware
const csrfProtection = csrf();
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  // ##################### Flash Middleware

  // Link A Current User to Session Middleware
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {});
});

// ############ Express Local Variables to be passed to view Middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// ############################################### ROUTES ##############################################
app.use(transactionRoutes);
app.use(authenticationRoutes);
// app.use(errorController.get404);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.protocol}://${req.get("host")}${
        req.originalUrl
      } on this Server! , Please Check The Url`,
      404
    )
  );
});

app.use(globalErrorHandler);

// // ################################################ SERVER THINGS #######################################
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {});
// app.listen(3000);
