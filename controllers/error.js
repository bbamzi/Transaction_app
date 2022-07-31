module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // const errorChecker = (code) => {
  //   if (code === 400) {
  //     return { statusCode: err.statusCode, errMessage: err.message };
  //   }
  // };
  res.status(err.statusCode).render("error", {
    statusCode: err.statusCode === 403 ? 401 : err.statusCode,
    errMessage:
      err.statusCode === 403
        ? "You Are Not Authorized For That Action, Please Log in ."
        : err.message,
  });
};
