const Product = require('../models/product');
const Order = require('../models/Order')

const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length == 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    const amounts = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) return 0;
        return product.offerPrice * item.quantity;
      })
    );

    let amount = amounts.reduce((acc, val) => acc + val, 0);
    amount = amount + Math.floor(amount * 0.02);
    await Order.create({
      userId,
      amount,
      address,
      items,
      paymentType: "COD",
    });
    res.json({ success: true, message: "Order Created Successfully" });
  } catch (error) {
    console.log("PlaceOrder COD ERROR", error.message);
    res.json({ success: false, message: error.message });
  }
}

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });
    console.log(orders);
    res.json({ success: true, orders });
  } catch (error) {
    console.log("Get User Orders Error", error.message);
    res.json({ success: false, message: error.message });
  }

}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log("Get All Orders Error", error.message);
    res.json({ success: false, message: error.message });
  }
}

module.exports = { placeOrderCOD, getUserOrders, getAllOrders };