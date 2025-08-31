const express = require("express")
const app = express();
const connectDB = require("./config/connectDB")
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoute')
const sellerRoutes = require('./routes/sellerRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use('/api/user' , userRoutes);
app.use('/api/seller' , sellerRoutes);
app.use('/api/product' , productRoutes);
app.use('/api/cart' , cartRoutes);

const PORT = 7000;
app.listen(PORT , ()=>{
    console.log(`Server is listening on PORT : ${PORT}`)
})