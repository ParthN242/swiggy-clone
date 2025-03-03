const Order = require("../../Models/order.model");

// Get all user orders
exports.getAllUsersOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("resDetail")
      .populate("cartItems.food")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json(error);
  }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json(error);
  }
};
