const Product = require('../models/product');
const Order = require('../models/Order');
const Stripe = require('stripe');
const User = require('../models/user');

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
    console.log(userId)
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });
    console.log(orders)

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
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    let productData = [];
    const amounts = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) return 0;

        productData.push({
          name: product.name,
          price: product.offerPrice,
          quantity: item.quantity,
        });

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
      isPaid: false,
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("PlaceOrder Stripe ERROR", error.message);
    res.json({ success: false, message: error.message });
  }
};


const stripWebHooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      const session = sessions.data[0];
      if (session && session.metadata) {
        const { orderId, userId } = session.metadata;
        console.log("✅ Payment succeeded for order:", orderId);

        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        await User.findByIdAndUpdate(userId, { cartItems: [] });
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      const session = sessions.data[0];
      if (session && session.metadata) {
        const { orderId } = session.metadata;
        console.log("❌ Payment failed, deleting order:", orderId);

        await Order.findByIdAndDelete(orderId);
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      if (session.metadata && session.metadata.orderId) {
        console.log("⌛ Checkout expired, deleting order:", session.metadata.orderId);
        await Order.findByIdAndDelete(session.metadata.orderId);
      }
      break;
    }

    default:
      console.warn(`⚠️ Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};



module.exports = { placeOrderCOD, getUserOrders, getAllOrders , placeOrderStripe , stripWebHooks };