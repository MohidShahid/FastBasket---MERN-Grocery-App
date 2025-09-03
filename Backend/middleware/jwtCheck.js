const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_KEY;


const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(201).json({ message: "No token found" });
    }
    const decoded = jwt.verify(token , key);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
}

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.status(201).json({ message: "No token found" });
  }
   const decoded = jwt.verify(sellerToken, key);

    req.user = decoded;
    next();
}


module.exports = { authUser, authSeller };