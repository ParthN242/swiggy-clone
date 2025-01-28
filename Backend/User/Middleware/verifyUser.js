const jwt = require("jsonwebtoken");
const User = require("../../Models/user.model.js");

const verfiyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || token === "") {
      return res
        .status(401)
        .json({ message: "Please Login to access resources" });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(isValid.id);

    req.user = user;

    next();
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: "Please Login to access resources",
    });
  }
};

module.exports = verfiyUser;
