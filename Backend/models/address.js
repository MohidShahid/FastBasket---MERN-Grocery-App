const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , 
        ref : "user",
        required : true
    },
    fname : {type : String , required : true},
    lname : {type : String },
    email : {type : String , required : true},
    street : {type : String , required : true},
    state : {type : String , required : true},
    city : {type : String , required : true},
    country : {type : String , required : true},
    zipcode : {type : Number , required : true},
    phone : {type : Number , required : true},
}, {timestamps : true});

const Address = mongoose.models.address || mongoose.model('address' , addressSchema);

module.exports = Address;