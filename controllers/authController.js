import { User } from "../models/User.js";
import { CustomError, handleError } from "../util/errors.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../middleware/auth.js";
import { removeUpload } from "../util/helpers.js";

// register
export const register = async (req, res) => {
  try {
    // get data from request
    const { name, email, phone, password } = req.body;
    // check if user with email already exists
    if (await User.exists({ email })) {
      throw new CustomError("Email is taken");
    }
    // check if user with phone already exists
    if (await User.exists({ phone })) {
      throw new CustomError("Phone is taken");
    }
    // create user with request data
    const newUser = new User({ name, email, phone, password });
    // assign image path
    if (req.file) {
      newUser.image = req.file.path;
    }
    //  schema validation
    await newUser.validate();

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Account created", user: newUser.id });
  } catch (error) {
    removeUpload(req.file);
    // handle errors
    handleError(res, error, "Registration failed");
  }
};

// login
export const login = async (req, res) => {
  try {
    // get data from request
    const { email, password } = req.body;
    // check if user with email already exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid credentials");
    }

    // verify password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Invalid credentials");
    }

    const token = createJWT({ email, name: user.name });
    if (!token) {
      throw new CustomError("Could not authenticate");
    }

    return res.status(200).json({ message: "Authenticated", token });
  } catch (error) {
    // handle errors
    handleError(res, error, "Authentication failed");
  }
};
