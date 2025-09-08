const express = require("express")
const app = express();
const connectDB = require("./config/connectDB");
const {connectCloudinary} = require("./config/cloudinary");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoute')
const sellerRoutes = require('./routes/sellerRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute')
const addressRoutes = require('./routes/addressRoute');
const { stripWebHooks } = require("./controllers/orderController");

connectDB();
connectCloudinary();
const allowedOrigins = [process.env.FRONTEND_URL , 'http://localhost:5174']
app.use(cors({
    origin : allowedOrigins,
    credentials : true
}));
app.post('/stripe' ,express.raw({type : 'application/json'}) , stripWebHooks);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use('/api/user' , userRoutes);
app.use('/api/seller' , sellerRoutes);
app.use('/api/product' , productRoutes);
app.use('/api/cart' , cartRoutes);
app.use('/api/order' , orderRoutes);
app.use('/api/address' , addressRoutes);

const PORT = 7000;
app.listen(PORT , ()=>{
    console.log(`Server is listening on PORT : ${PORT}`)
})