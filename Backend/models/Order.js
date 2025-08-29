const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "product",
                required : true
            },
            quantity : { type : Number , required : true, default : 1}
        }
    ],
    amount : {type : Number , required : true},
    address : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "address"},
    status: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },
     paymentType: {
      type: String,
      enum: ["Online", "COD"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
} ,  { timestamps: true });

const Order = mongoose.model("order" , orderSchema);

module.exports = Order;