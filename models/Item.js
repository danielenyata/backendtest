import mongoose from "mongoose";
const { Schema } = mongoose;

export const itemSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  description: String,
  image: String
});
export const Item = mongoose.model("Item", itemSchema);
