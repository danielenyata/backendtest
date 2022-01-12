import mongoose from "mongoose";
const { Schema } = mongoose;

export const itemSchema = new Schema({
  name: String,
  user_id: Schema.Types.ObjectId,
  description: String,
  image: String
});
export const Item = mongoose.model("Item", itemSchema);
