const Admin = require("../../Models/admin.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin)
      return res.status(401).json({ error: { message: "Admin not found" } });

    const isPasswordMatch = bcrypt.compareSync(password, admin.password);

    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ error: { message: "Password not matched" } });

    const { password: pass, ...rest } = admin._doc;

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    };

    res.cookie("admin-token", token, option);

    res.status(200).json({ success: true, admin: rest });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

exports.adminCreate = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const admin = await Admin.create({ email, password, name });

    res.status(201).json({ success: true, admin: email });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

exports.adminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(201).json({ success: true, admin });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

// Log Out
exports.adminLogout = async (req, res, next) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: false,
    };
    res.clearCookie("admin-token", option);
    res.status(200).json({ success: true, message: "Sign Out Successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
