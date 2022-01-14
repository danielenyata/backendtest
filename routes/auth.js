import { Router } from "express";
import { registerValidator, loginValidator } from "../util/validators.js";
import { validateData, validateAvatar } from "../middleware/validator.js";
import { register, login } from "../controllers/authController.js";

// PROTECTED
// actions on the authenticated user
export const authRouter = Router();

// register/create new user
authRouter.post(
  "/register",
  validateAvatar,
  validateData(registerValidator),
  register
);

// login user
authRouter.post("/login", validateData(loginValidator), login);
