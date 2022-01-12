import { Item } from "../models/Item.js";
import { DB_VALIDATION_ERROR } from "../util/errors.js";
import { User } from "../models/User.js";

// get all user items
export const getInventory = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const inventory = await Item.find({ user_id: user.id });
    res.status(200).json({ count: inventory.length, inventory });
  } catch (error) {
    res.status(400).json({ message: "Could not fetch inventory" });
  }
};
// create/add an item
export const addItem = async (req, res) => {
  try {
    //   get authenticated user from request
    const authUser = req.user;
    const user = await User.findOne({ email: authUser.email });
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { name, description } = req.body;
    // create item with request data
    const newItem = new Item({ name, description });
    // assign user id as reference
    newItem.user_id = user.id;
    //  schema validation
    await newItem.validate();

    await newItem.save();

    res.status(201).json({ message: "Item created", item: newItem.id });
  } catch (error) {
    if (error instanceof DB_VALIDATION_ERROR) {
      console.error("VALIDATION ERRORS:", Object.keys(error.errors));
    }
    res.status(400).json({ message: "Could not add item" });
  }
};
