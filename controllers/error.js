// exports.get404 = (req, res, next) => {
//   res.status(404).render("404", {
//     pageTitle: "Page Not Found",
//   });
// };

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res
    .status(err.statusCode)
    .render(`${err.statusCode}`, { errStatus: err.status });
};
