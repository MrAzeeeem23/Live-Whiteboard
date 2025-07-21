import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/whiteboard-app")
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB is connected Successfully")
    } catch (error) {
        console.log("Error while connecting with MongoDB: ", error.meaage)
    }
}

export default connectDB;