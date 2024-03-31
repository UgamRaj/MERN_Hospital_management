import mongoose from "mongoose";

const connectDB = async (DATABASE_URL, DB_NAME) => {
  try {
    const DB_OPTIONS = {
      dbName: DB_NAME, //Check .env file
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully.....");
  } catch (err) {
    console.log("database ", err);
  }
};

//Export
export default connectDB;
