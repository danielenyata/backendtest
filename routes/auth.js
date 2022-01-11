import { Router } from "express";

// PROTECTED
// actions on the authenticated user
export const authRouter = Router();

// register/create new user
authRouter.post("/register", (req, res) => {
  res.send("register");
});

// login user
authRouter.post("/login", (req, res) => {
  res.send("login");
});
