const bcrpyt = require("bcrypt");
const User = require("./../model/userModel");
const sendEmail = require("./../util/email");
const crypto = require("crypto");
const { token } = require("morgan");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "login" });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrpyt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.redirect("/transactions");
            });
          } else {
            res.redirect("/login");
          }
        })
        .catch((err) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {});
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
    return res.redirect("/signup");
  }
  if (password !== confirmPassword) {
    return res.redirect("/signup");
  }
  const hashedPassword = await bcrpyt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
    transactions: [],
  });
  await newUser.save();
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
    console.log("token invalid");
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
    console.log("token invalid");
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
