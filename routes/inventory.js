import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
// PROTECTED
// actions on the authenticated user
export const inventoryRouter = Router();

// get items/inventory
inventoryRouter.get("/", verifyToken, (req, res) => {
  res.send("get inventory");
});
// get specific item
inventoryRouter.get("/:id", verifyToken, (req, res) => {
  res.send("get item");
});
// create/add item
inventoryRouter.post("/:id", verifyToken, (req, res) => {
  res.send("create item");
});
// edit item
inventoryRouter.patch("/:id", verifyToken, (req, res) => {
  res.send("edit item");
});
// delete item
inventoryRouter.delete("/:id", verifyToken, (req, res) => {
  res.send("delete item");
});
