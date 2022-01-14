import { Router } from "express";
import {
  getUser,
  getProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
import { idValidator } from "../util/validators.js";

// PROTECTED
// actions on the authenticated user
export const userRouter = Router();
userRouter.use(verifyToken);
// get user details
userRouter.get("/", getProfile);
// edit user details
userRouter.patch("/", (req, res) => {
  res.send("edit user");
});
// delete user
userRouter.delete("/", (req, res) => {
  res.send("delete user");
});

// OPEN
// actions on the any user
export const usersRouter = Router();
usersRouter.use(verifyToken);

// get all users
usersRouter.get("/", getAllUsers);

// get specific user
usersRouter.get("/:id", idValidator, getUser);
