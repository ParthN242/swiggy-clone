const User = require("../../Models/user.model.js");

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error });
  }
};
