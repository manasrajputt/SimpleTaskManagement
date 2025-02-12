import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(
      `\nMongoDB Connected !! Db Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default connectDB;
