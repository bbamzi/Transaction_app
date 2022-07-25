exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

exports.getFlashMessage = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
    res.locals.message = message;
    message = res.locals.message;
  } else {
    message = null;
  }

  next();
};
