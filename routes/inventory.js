import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getInventory,
  getItem,
  addItem,
  editItem,
  deleteItem,
} from "../controllers/inventoryController.js";
import { validateData } from "../middleware/validator.js";
import {
  addItemValidator,
  editItemValidator,
  idValidator,
} from "../util/validators.js";

// ALL ROUTES ARE PROTECTED
// actions require user to be authenticated
export const inventoryRouter = Router();
inventoryRouter.use(verifyToken);
// get items/inventory
inventoryRouter.get("/", getInventory);

// get specific item
inventoryRouter.get("/:id", validateData(idValidator), getItem);

// create/add item
inventoryRouter.post("/", validateData(addItemValidator), addItem);

// edit item
inventoryRouter.patch("/:id", validateData(editItemValidator), editItem);

// delete item
inventoryRouter.delete("/:id", validateData(idValidator), deleteItem);
