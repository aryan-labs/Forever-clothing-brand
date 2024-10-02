import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://aryanshrivastava234:shriabhi79@cluster0.jorly.mongodb.net/e-commerce"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
