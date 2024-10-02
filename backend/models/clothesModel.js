import mongoose from "mongoose";
const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  size: { type: Array, required: true },
  bestseller: { type: Boolean },
});

const clothesModel =
  mongoose.models.clothes || mongoose.model("clothes", clothesSchema);
export default clothesModel;
