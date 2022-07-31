const { validationResult } = require("express-validator");

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.session.messageType = "error";
    req.flash("error", "You Need To Be Logged in To View That Page");
    return res.redirect("/login");
  }
  next();
};

exports.getFlashMessage = (req, res, next) => {
  let message = req.flash(
    `${req.session.messageType === "success" ? "success" : "error"}`
  );
  console.log(req.session.messageType);
  if (message.length > 0) {
    message = message[0];
    res.locals.message = message;
    res.locals.messageType = req.session.messageType;
  } else {
    message = null;
  }

  next();
};

exports.getValidationError = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).render(`${req.url}`, {
      message: errors.array()[0].msg,
    });
  }
  next();
};
