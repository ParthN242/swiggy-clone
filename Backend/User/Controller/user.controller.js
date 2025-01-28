const User = require("../../Models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("../../Models/restaurant.model.js");
const Food = require("../../Models/food.model.js");
const Order = require("../../Models/order.model.js");
const Stripe = require("stripe");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../../Utils/nodeEmail.js");
const dotenv = require("dotenv");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// User Signup
exports.userSignUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(403).json({ message: "User already exists" });

    const user = await User.create({ email, password, name });

    res.status(201).json({ success: true, user: user.email });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Login User
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({ error: { message: "User not found" } });

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ error: { message: "Password not matched" } });

    const { password: pass, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: false,
    };

    res.cookie("token", token, option);

    res.status(200).json({ success: true, user: rest });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Log Out
exports.userLogout = async (req, res, next) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: false,
    };
    res.clearCookie("token", option);
    res.status(200).json({ success: true, message: "Sign Out Successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { email, name, address, city, areaName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { email, name, address, city, areaName },
      { new: true }
    );

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error });
  }
};

exports.getAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    const r = await Restaurant.updateMany(
      {},
      { avgRating: 4.3, totalReviews: 4100 }
    );

    return res.status(200).json({ success: true, restaurants });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Get Restaurant Detail By Id
exports.getRestaurantDetails = async (req, res, next) => {
  try {
    const { resId } = req.params;

    const restaurant = await Restaurant.findById(resId).populate("foods");

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Search restaurant and food
exports.searchFoodRestaurant = async (req, res) => {
  const { s } = req.query;

  const search = s.toLowerCase().trim();

  try {
    const restaurants = await Restaurant.find(
      {
        name: { $regex: search, $options: "i" },
      },
      { _id: 1, name: 1, image: 1, type: "restaurant" }
    );

    const foods = await Food.find(
      { name: { $regex: search, $options: "i" } },
      { _id: 1, name: 1, image: 1, restaurant: 1, type: "food" }
    );

    const searchResult = [...restaurants, ...foods];

    return res.status(200).json({ success: true, searchResult });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Create Payment Intent
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const user = req.user;
    const { cartItems } = req.body;

    const itemTotalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const totalPrice =
      itemTotalPrice + 50 + Number((itemTotalPrice * 0.04).toFixed());

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "inr",
      payment_method_types: ["card"],
      description: "Purchase of food items from Swiggy",
      // metadata: JSON.stringify(cartItems),
      shipping: {
        name: user?.name,
        address: {
          line1: user?.address,
          postal_code: "395004",
          city: user?.city,
          state: "GJ",
          country: "IN",
        },
      },
    });

    return res.status(200).json({
      success: true,
      session_id: paymentIntent.client_secret,
      totalPayment: totalPrice,
    });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Create a order
exports.createOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const { cartItems, resDetail, paymentId, paymentStatus, totalPayment } =
      req.body;

    const order = await Order.create({
      resDetail,
      cartItems,
      user: user._id,
      paymentId,
      paymentStatus,
      status: "Preparing",
      totalPayment,
    });

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Cancel the Order
exports.cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: req.user });

    if (!order)
      return res.status(401).json({ success: false, error: "order not found" });

    order.status = "Canceled";
    await order.save();

    return res.status(200).json({ success: true, message: "Order Cancelled" });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Order
exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("resDetail")
      .populate("cartItems.food")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// forgotPassword
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Send Reset Password Token
    const emailSentResult = await sendResetPasswordEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
      emailSentResult,
    });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// resetPassword
exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });

    // Hashed Password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    // await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
