import { User } from "../models/User.js";
import { DB_VALIDATION_ERROR } from "../util/errors.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../middleware/auth.js";

// register
export const register = async (req, res) => {
  try {
    // get data from request
    const { name, email, phone, password } = req.body;
    // check if user with email already exists
    let exists = await User.exists({ email });
    if (exists) {
      return res.status(400).json({ message: "Email is taken" });
    }
    exists = await User.exists({ phone });
    if (exists) {
      return res.status(400).json({ message: "Phone is taken" });
    }
    // create user with request data
    const newUser = new User({ name, email, phone, password });
    //  schema validation
    await newUser.validate();

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Account created", user: newUser.id });
  } catch (error) {
    if (error instanceof DB_VALIDATION_ERROR) {
      console.error("VALIDATION ERRORS:", Object.keys(error.errors));
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

    return res
      .status(200)
      .json({ message: "Authenticated", token, user: user.id });
  } catch (error) {
    return res.status(400).json({ message: "Authentication failed" });
  }
};
