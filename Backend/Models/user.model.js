const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: [true, "Email is already register"],
    },
    address: {
      type: String,
      default: "",
    },
    areaName: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      //   max: [8, "Password Length Must Be 8 Characters"],
      select: false,
    },

    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
  },
  { timestamps: true }
);

// Password Hasing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcryptPassword = bcrypt.hashSync(this.password, 10);
    this.password = bcryptPassword;
  }
  next();
});

const userModel = mongoose.models?.user || mongoose.model("user", userSchema);

module.exports = userModel;
