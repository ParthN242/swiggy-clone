const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
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
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      //   max: [8, "Password Length Must Be 8 Characters"],
      select: false,
    },
    admin: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Password Hasing
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcryptPassword = bcrypt.hashSync(this.password, 10);
    this.password = bcryptPassword;
  }
  next();
});

const adminModel =
  mongoose.models?.admin || mongoose.model("admin", adminSchema);

module.exports = adminModel;
