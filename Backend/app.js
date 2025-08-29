const express = require("express")
const app = express();
const connectDB = require("./config/connectDB")
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoute')
const sellerRoutes = require('./routes/sellerRoute')

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use('/api/user' , userRoutes);
app.use('/api/seller' , sellerRoutes);


const PORT = 7000;
app.listen(PORT , ()=>{
    console.log(`Server is listening on PORT : ${PORT}`)
})