const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  dateJoined: { type: Date, default: Date.now },

  email: {
    type: String,
    trim: true,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "administrator", "pro-user"],
    default: "user",
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  password: {
    type: String,
  },
  passwordConfirm: {
    type: String,
  },
  // message: "Passwords are not the same",
  //   },
  // region: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //   },
  //   coordinates: {
  //     type: [Number],
  //   },
  // },
  clientSignature: { type: String },
  logo: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
