import { User } from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createJWT } from "../middleware/auth.js";

// register
export const register = async (req, res) => {
  try {
    // get data from request
    const { name, email, phone, password } = req.body;
    // check if user with email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email is taken" });
    }
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = password;

    await newUser.validate();
    newUser.save();

    return res.status(201).json({ message: "Account created" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log("VALIDATION ERRORS:", Object.keys(error.errors));
    }
    return res.status(400).json({ message: "Registration failed" });
  }
};

// register
export const login = async (req, res) => {
  try {
    // get data from request
    const { email, password } = req.body;
    // check if user with email already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createJWT({ email, name: user.name });
    if (!token) {
      return res.status(400).json({ message: "Authentication failed" });
    }

    return res.status(200).json({ message: "Authenticated", token });
  } catch (error) {
    return res.status(400).json({ message: "Authentication failed" });
  }
};
