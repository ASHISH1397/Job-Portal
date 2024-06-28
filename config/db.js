import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv'
const connectDB= async()=>{
    try{
        const connection= await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB Database ${mongoose.connection.host}`.magenta)
    }
    catch(error){
        console.log(`MongoDB error ${error}`.red.bold);
    }

};

export default connectDB;

