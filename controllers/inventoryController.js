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
// get a specific user item
export const getItem = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { id } = req.params;
    const item = await Item.findOne({ id, user_id: user.id });
    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ item });
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
// patch/update an item
export const editItem = async (req, res) => {
  try {
    //   get authenticated user from request
    const authUser = req.user;
    const user = await User.findOne({ email: authUser.email });
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { name, description } = req.body;
    const { id } = req.params;
    // find object with given id
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }
    // patch item data
    item.name = name || item.name;
    item.description = description || item.description;

    // validate schema and save
    await item.validate();
    await item.save();

    res.status(200).json({ message: "Item updated", item });
  } catch (error) {
    if (error instanceof DB_VALIDATION_ERROR) {
      console.error("VALIDATION ERRORS:", Object.keys(error.errors));
    }
    res.status(400).json({ message: "Could not add item" });
  }
};

// delete a specific user item
export const deleteItem = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { id } = req.params;
    const item = await Item.findOne({ id, user_id: user.id });
    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }
    const deleted = await Item.deleteOne({ id });
    if (!deleted.deletedCount) {
      res.status(400).json({ message: "Could not delete item" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: "Could not fetch inventory" });
  }
};
