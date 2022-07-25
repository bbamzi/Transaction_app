const bcrpyt = require("bcrypt");
const User = require("./../model/userModel");
const sendEmail = require("./../util/email");
const crypto = require("crypto");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    message: res.locals.message,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    req.flash("error", "Invalid email or password.");
    return res.redirect("/login");
  }

  const doMatch = await bcrpyt.compare(password, user.password);
  console.log(doMatch);
  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      res.redirect("/transactions");
    });
  } else {
    req.flash("error", "Invalid email or password.");
    res.redirect("/login");
  }
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    req.flash("error", "This Email has Already Been Used For Signup");
    return res.redirect("/signup");
  }
  if (password !== confirmPassword) {
    req.flash("error", "Passwords Do Not Match");
    return res.redirect("/signup");
  }
  const hashedPassword = await bcrpyt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
    transactions: [],
  });
  await newUser.save();
  req.flash("success", "Sign Up Successful");
  return res.redirect("/login");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getRequestResetPassword = (req, res, next) => {
  res.render("auth/requestResetPassword", {
    pageTitle: "Reset Password?",
  });
};

exports.postRequestResetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "Invalid Email");
    return res.redirect("/request-reset-password");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = resetToken;
  user.passwordResetTokenExpires = Date.now() + 10 * 60 * 10000;
  await user.save();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/password-reset/${resetToken}}`;
  const message = `Forgot Your Password? Follow the link below and input  your new passowrd and passwordConfirm to: ${resetURL}.\nIf you didnt make this request , please ignore the message`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Your Password Reset Token. valid for 10 min ",
      message,
    });

    return res.redirect("/request-token-sent");
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return res.redirect("/request-reset-password");
  }
};

exports.tokenSent = (req, res, next) => {
  res.render("auth/tokenSent", {
    pageTitle: "Token Sent",
  });
};

exports.getResetPassword = async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    req.flash("error", "Expired or Invalid Token");

    return res.redirect("/login");
  }

  res.render("auth/passwordReset", {
    pageTitle: "Change Password",
    userId: user._id.toString(),
    resetToken,
  });
};

exports.postResetPassword = async (req, res, next) => {
  const { userId, resetToken, password, passwordConfirm } = req.body;
  const user = await User.findOne({
    _id: userId,
    passwordResetToken: resetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.redirect("/login");
  }

  if (password !== passwordConfirm) {
    return res.redirect(`/password-reset/${resetToken}`);
  }
  const hashedPassword = await bcrpyt.hash(password, 12);
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  return res.redirect("/");
};
