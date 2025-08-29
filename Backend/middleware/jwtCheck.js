const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_KEY;


const authUser = async(req , res , next)=>{
  const {token} = req.cookies;  
  if(!token){
    res.status(201).json({message : "No token found"});
  }
  jwt.verify(token , key , (err , user)=>{
    if(err){
       return res.status(401).send("Unauthorized User");
    }
    req.user = user;
    next();
  })
  
}

const authSeller = async(req , res , next)=>{
  const {sellerToken} = req.cookies;  
  if(!sellerToken){
    res.status(201).json({message : "No token found"});
  }
  jwt.verify(sellerToken , key , (err , user)=>{
    if(err){
       return res.status(401).send("Unauthorized User");
    }
    req.user = user;
    next();
  })
  
}


module.exports = {authUser , authSeller};