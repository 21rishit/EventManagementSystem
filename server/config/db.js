import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("MongoDB Connected");
   } catch (err) {
      console.error("Database connection error:", err);
      process.exit(1);
   }
};

export default connectDB;
