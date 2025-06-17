import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  if (!mongoURI || typeof mongoURI !== "string") {
    console.error("❌ Invalid Mongo URI:", mongoURI);
    throw new Error("Mongo URI is undefined or not a string");
  }

  const { connection } = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`✅ MongoDB Connected to ${connection.host}`);
};
