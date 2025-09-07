const Product = require('../models/product');
const Order = require('../models/Order');
const stripe = require('stripe');

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


const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const {origin } = req.headers;
    if (!address || items.length == 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }
    let productData = [];
    const amounts = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        productData.push({
          name : product.name,
          price : product.price,
          quantity : item.quantity
        })
        if (!product) return 0;
        return product.offerPrice * item.quantity;
      })
    );

    let amount = amounts.reduce((acc, val) => acc + val, 0);
    amount = amount + Math.floor(amount * 0.02);
    const order = await Order.create({
      userId,
      amount,
      address,
      items,
      paymentType: "Online",
    });

    // stripe payment gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item)=>{
      return {
        price_data : {
          currency : "usd",
          product_data : {
            name : item.name
          },
          unit_amount : Math.floor(item.price + item.price * 0.02) * 100
        },
        quantity : item.quantity
      }
    })

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode : "payment",
      success_url : `${origin}/loader?next=my-orders`,
      cancel_url : `${origin}/cart`,
      metadata : {
        orderId : order._id.toString(),
        userId
      }
    })
    res.json({ success: true, url : session.url });
  } catch (error) {
    console.log("PlaceOrder COD ERROR", error.message);
    res.json({ success: false, message: error.message });
  }
}

module.exports = { placeOrderCOD, getUserOrders, getAllOrders , placeOrderStripe };