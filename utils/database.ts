import mongoose from "mongoose";

let isConnected = false;
const mongoUri = process.env.MONGOBD_URL || ''

export const connectToBD = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected!");
    return;
  }
  try {
      await mongoose.connect(mongoUri, {
        dbName: "share_prompt",
        // useNewUrlParsel: true,
        // useUnifieldTopology: true,
      });
    isConnected = true;
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
};
