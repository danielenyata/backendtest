import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { getInventory, addItem } from "../controllers/inventoryController.js";
import { validateData } from "../middleware/validator.js";
import { addItemValidator } from "../util/validators.js";

// ALL ROUTES ARE PROTECTED
// actions require user to be authenticated
export const inventoryRouter = Router();
inventoryRouter.use(verifyToken);
// get items/inventory
inventoryRouter.get("/", getInventory);

// get specific item
inventoryRouter.get("/:id", (req, res) => {
  res.send("get item");
});

// create/add item
inventoryRouter.post("/", validateData(addItemValidator), addItem);

// edit item
inventoryRouter.patch("/:id", verifyToken, (req, res) => {
  res.send("edit item");
});

// delete item
inventoryRouter.delete("/:id", verifyToken, (req, res) => {
  res.send("delete item");
});
