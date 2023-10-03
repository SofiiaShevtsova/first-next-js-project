import mongoose from "mongoose";

let isConnected = false;

export const connectToBD = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected!");
    return;
  }
  try {
    process.env.MONGOBD_URL &&
      (await mongoose.connect(process.env.MONGOBD_URI, {
        dbName: "share_prompt",
        useNewUrlParsel: true,
        useUnifieldTopology: true,
      }));
    isConnected = true;
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
};
