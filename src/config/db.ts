import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

export async function connectDB() {
  try {
    if (!mongoURI) {
      throw new Error("Mongo DB URI is undefined or null");
    }
    await mongoose.connect(mongoURI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.error(
        "MongoDB connection error, please make sure db is up and running"
      );
      console.error(error);
      process.exit();
    });
  } catch (error) {
    console.error("Something went wrong when connect to DB");
    console.error(error);
    console.log("----------");
  }
}
