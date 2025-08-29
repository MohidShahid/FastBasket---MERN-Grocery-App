const jwt = require('jsonwebtoken');
const sellerLogin = async(req , res)=>{
    try {
        const {email , password} = req.body;
        if(email == process.env.SELLER_EMAIL && password == process.env.SELLER_PASSWORD){
          const token = jwt.sign({email} , process.env.JWT_SECRET_KEY , {expiresIn : '7d'});
          res.cookie("sellerToken" , token , {
                secure : process.env.NODE_ENV === 'production',
                sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' 
             });

            res.status(201).json({success : true , message : "Logged In"})
        }
        res.status(201).json({success : false , message : "Invalid Credentials"})
    } catch (error) {
        console.log("Seller Login Error" , error.message);
        res.status(401).json({success : false , message : error.message})
    }
}

const isSellerAuth = async(req , res)=>{
    try {
        res.status(201).json({success : true});
    } catch (error) {
        res.status(401).json({success : false , message : "Unauthorized"});
    }
}

const logout = async(req , res)=>{
    try {
    res.clearCookie('token' , {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' 
    });
    res.status(201).json({success : true , message : "Logged out"})
   } catch (error) {
     console.log("Seller Logout" , error.message);
     res.status(401).json({success : false , message : error.message});
   }
}

module.exports = {sellerLogin , isSellerAuth , logout};