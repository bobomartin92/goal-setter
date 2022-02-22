const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/goalsDB" || process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
} 

module.exports = connectDB