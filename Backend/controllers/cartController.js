const User = require('../models/user')


const updateCart = async(req , res)=>{
    try {
       const {userId , cartItems} = req.body;
       await User.findByIdAndUpdate(userId , {cartItems});
       res.status(201).json({success : true , message : "Cart Updated"});
    } catch (error) {
        console.log("Update Cart Error" , error.message)
        res.status(401).json({success : false , message : error.message});
    }
}

module.exports = {updateCart};