import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  image: String,
  isAdmin: { type: Boolean, default: false, immutable: true },
  password: { type: String, required: true },
});

// HOOKS

// add salt and hash password before saving user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
