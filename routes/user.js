import { Router } from "express";

// PROTECTED
// actions on the authenticated user
export const userRouter = Router();
// get user details
userRouter.get("/", (req, res) => {
  res.send("get authenticated user");
});
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
// get all users
usersRouter.get("/", (req, res) => {
  res.send("get all users");
});

// get specific user
usersRouter.get("/:id", (req, res) => {
  res.send("get user" + req.params.id);
});
