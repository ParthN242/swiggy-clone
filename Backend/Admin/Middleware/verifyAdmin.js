const jwt = require("jsonwebtoken");
const Admin = require("../../Models/admin.model.js");

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies["admin-token"];

  if (!token || token == "")
    return res.status(401).json({
      error: { message: "Please Login To Access Resources No Token" },
    });

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(isValid.id);

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      error: { message: "Invalid Token" },
    });
  }
};

module.exports = verifyAdmin;
