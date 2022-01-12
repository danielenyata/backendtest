import { Router } from "express";
import { usersRouter, userRouter } from "../routes/user.js";
import { inventoryRouter } from "../routes/inventory.js";
import { authRouter } from "../routes/auth.js";

export const router = Router();
router.get("/", (req, res) => {
  res.send("Inventory🚀");
});
// Auth
router.use("/auth", authRouter);

// User
router.use("/user", userRouter);
router.use("/users", usersRouter);
// Inventory
router.use("/inventory", inventoryRouter);
