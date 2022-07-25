const bcrpyt = require("bcrypt");
const User = require("./../model/userModel");
const sendEmail = require("./../util/email");
const crypto = require("crypto");

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

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((userRes) => {
      if (userRes) {
        return res.redirect("/signup");
      }
      return bcrpyt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          confirmPassword,
          transactions: [],
        });
        return user.save();
      });
    })
    .then((result) => {
      sendEmail({ email, subject: "welcome", message: "welcome boss" });
      res.redirect("/login");
    })
    .catch((err) => {});
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
  user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
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
  res.render("auth/passwordReset", {
    pageTitle: "Change Password",
  });
};

exports.postResetPassword = async (req, res, next) => {
  const token = req.params.resetToken;
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.redirect("auth/passwordReset");
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return res.redirect("/");
};
