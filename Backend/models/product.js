const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {type : String , required : true},
    category : {type : String , required : true},
    price : {type : Number , required : true},
    offerPrice : {type : Number , required : true},
    image : {type : [String] , required : true},
    description : {type : [String] , required : true},
    inStock : {type : Boolean , default : true}
    
}, { timestamps: true } );

const Product = mongoose.model("product" , ProductSchema);
module.exports = Product;