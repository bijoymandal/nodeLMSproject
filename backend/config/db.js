import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const connectionDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch(err){
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
} 

export default connectionDB;