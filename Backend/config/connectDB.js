const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database Connection failed" , error.message);
    }
}

module.exports = connectDB;
