const addressModel = require("../models/address");

const addAddress = async(req , res)=>{
  try {
  const {address , userId} = req.body;
  await addressModel.create({...address , userId});
  res.json({success : true , message : "Address Added Successfully"});
  } catch (error) {
      console.log("Add Address Error" , error.message);
      res.json({success : false , message : error.message}); 
  } 
}

const getAddress = async(req , res)=>{
    try {
        const {userId} = req.body;
       const addresses = await addressModel.find({userId});
        res.json({success : true , addresses});
    } catch (error) {
      console.log("Get Address Error" , error.message);
      res.json({success : false , message : error.message}); 
    }
}


module.exports = {addAddress , getAddress};