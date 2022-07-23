const bcrpyt = require("bcrypt");
const User = require("./../model/userModel");

exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie"));
  res.render("login", { pageTitle: "login" });
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
              console.log(err);
              res.redirect("/transactions");
            });
          } else {
            res.redirect("/");
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
  console.log(req);
};

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Signup",
    isAuthenticated: false,
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
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
