// const Transaction = require('./../model/transactionModel');

// exports.getAllTransactions = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.id) filter = { user: req.params.id };
//   const queryObj = { ...req.query };
//   const excludedFields = ['page', 'sort', 'limit', 'fields'];
//   excludedFields.forEach((el) => delete queryObj[el]);
//   const query = Transaction.find(queryObj).populate({
//     path: 'user',
//     select: 'firstName lastName',
//   });
//   const transactions = await query;
//   res.status(200).json({
//     status: 'success',
//     results: transactions.length,
//     data: {
//       transactions,
//     },
//   });
// });
// // To get single transacton from Database
// exports.getTransaction = factory.getOne(Transaction);

// // to add transaction to databsda
// exports.addTransaction = catchAsync(async (req, res, next) => {
//   if (!req.body.user) req.body.user = req.user.id;
//   const newTransaction = await Transaction.create(req.body);
//   res.status(201).json({
//     status: 'Success',
//     data: {
//       newTransaction,
//     },
//   });
// });

// exports.updateTransaction = factory.updateOne(Transaction);

// exports.deleteTransaction = factory.deleteOne(Transaction);
