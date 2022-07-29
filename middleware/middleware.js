const { validationResult } = require("express-validator");

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

exports.getFlashMessage = (req, res, next) => {
  let message = req.flash(
    `${"success" in req.session.flash ? "success" : "error"}`
  );
  // const messageType = `${"success" in req.session.flash ? "success" : "error"}`;
  const messageType = "error";
  if (message.length > 0) {
    message = message[0];
    res.locals.message = message;
    res.locals.messageType = messageType;
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
