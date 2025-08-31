const Product = require('../models/product');
const Order = require('../models/Order')

const placeOrderCOD = async(req , res)=>{
    try {
    const {userId , items , address} = req.body;

    if(!address || items.length == 0){
    return res.json({success : false , message : "Invalid Data"});
  }

  let amount = items.reduce(async(acc , item)=>{
    const product = await Product.findById(item.product);
    return (await acc) + product.offerPrice * item.quantity;
  });
    amount = Math.floor(amount * 0.02);
    await Order.create({
        userId,
        amount,
        address,
        items,
        paymentType : "COD",
    })
    } catch (error) {
        console.log("PlaceOrder COD ERROR" , error.message);
        res.json({success : false , message : error.message});
    }
}

const getUserOrders = async(req , res)=>{
    try {
      const {userId} = req.body;
      const orders = await Order.find({userId});
      res.json({success : true , orders});
    } catch (error) {
       console.log("Get User Orders Error" , error.message);
       res.json({success : false , message : error.message}); 
    }

}