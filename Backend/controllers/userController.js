const User = require('../models/user');
const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET_KEY;

const registerUser = async(req , res)=>{
    try {
        const {name , email , password} = req.body;
        const exisitingUser = User.findOne({email});
        if(exisitingUser){
           return res.send("user existed").status(201);
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await new User({name , email, password : hashPassword});
        await user.save();
        const token = jwt.sign({ email: user.email, name: user.name }, key, { expiresIn: '1d' });
        res.cookie("token" , token , {
                secure : process.env.NODE_ENV === 'production',
                sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' 
             })
        res.json({success : true , user}).status(201);
    } catch (error) {
        console.log("Register User Failed" , error.message);
        res.json({message : "Register User Failed"}).status(401);
    }

}

const LoginUser = async(req , res)=>{
    try {
        const {email , password} = req.body;
        const user = User.findOne({email}).select("-password");
        if(user) {
           const istrue = await bcrypt.compare(password , user.password);
           if(istrue){
             const token = jwt.sign({ email: user.email, name: user.name }, key, { expiresIn: '1d' })
             res.cookie("token" , token , {
                secure : process.env.NODE_ENV === 'production',
                sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' 
             })
             return res.status(201).json({success : true , user});
           }
        }
    } catch (error) {
        console.log("Login User failed" , error.message);
        res.json({message : "Invalid Credentials"}).status(401);
    }
}


const isAuth = async(req , res)=>{
   try {
    const {name , email} = req.user;
    const user = User.findOne({email}).select("-password");
    if(user) return res.status(201).json({success : true , user});
    return res.status(401).json({success : false , message : "Unauthorized Access"});
   } catch (error) {
     console.log("Unauthorized" , error.message);
     res.json({message : "Unauthorized Access"}).status(401);
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

module.exports = {registerUser , LoginUser , isAuth , logout};