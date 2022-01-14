import { Item } from "../models/Item.js";
import { removeUpload, removeFile } from "../util/helpers.js";
import { CustomError, handleError } from "../util/errors.js";

// get all user items
export const getInventory = async (req, res) => {
  try {
    // get authenticated user
    const user = req.user;

    const query = selectQuery(user.isAdmin, user.id, null);

    const inventory = await Item.find(query);

    res.status(200).json({ count: inventory.length, inventory });
  } catch (error) {
    handleError(res, error, "Could not fetch inventory");
  }
};
// get a specific user item
export const getItem = async (req, res) => {
  try {
    // get authenticated user
    const user = req.user;

    const { id } = req.params;
    const query = selectQuery(user.isAdmin, null, id);
    // find item
    const item = await Item.findOne(query);
    if (!item) {
      throw new CustomError("Not Found", 404);
    }
    verifyAccess(user, item);
    res.status(200).json({ item });
  } catch (error) {
    handleError(res, error, "Fetch failed");
  }
};
// create/add an item
export const addItem = async (req, res) => {
  try {
    //   get authenticated user from request
    const user = req.user;

    const { name, description } = req.body;
    // create item with request data
    const newItem = new Item({ name, description });
    // assign user id as reference
    newItem.user_id = user.id;
    // assign image path
    if (req.file) {
      newItem.image = req.file.path;
    }
    //  schema validation
    await newItem.validate();

    await newItem.save();

    res.status(201).json({ message: "Item created", item: newItem.id });
  } catch (error) {
    removeUpload(req.file);
    handleError(res, error, "Item creation failed");
  }
};
// patch/update an item
export const editItem = async (req, res) => {
  try {
    //   get authenticated user from request
    const user = req.user;

    const { name, description } = req.body;
    const { id } = req.params;

    const query = selectQuery(user.isAdmin, null, id);
    // find object with given id
    const item = await Item.findOne(query);
    if (!item) {
      throw new CustomError("Not Found", 404);
    }
    verifyAccess(user, item);

    // patch item data
    item.name = name || item.name;
    item.description = description || item.description;
    if (req.file) {
      removeFile(item.image);
      item.image = req.file.path;
    }

    // validate schema and save
    await item.validate();
    await item.save();

    res.status(200).json({ message: "Item updated", item });
  } catch (error) {
    removeUpload(req.file);
    handleError(res, error, "Item update failed");
  }
};

// delete a specific user item
export const deleteItem = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const query = selectQuery(user.isAdmin, user.id, id);

    const item = await Item.findOne(query);
    if (!item) {
      throw new CustomError("Not Found", 404);
    }
    verifyAccess(user, item);

    removeFile(item.image);
    const deleted = await Item.deleteOne({ id });
    if (!deleted.deletedCount) {
      throw new CustomError("Could not delete item");
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    handleError(res, error, "Item deletion failed");
  }
};

const selectQuery = (isAdmin, userId, itemId) => {
  const query = {};
  if (itemId) {
    query._id = itemId;
  }
  if (!isAdmin && userId) {
    query.user_id = userId;
  }
  return query;
};

const verifyAccess = (user, item) => {
  if (user.isAdmin) return true;
  // reject request if item does not belong to user
  if (!item.user_id.equals(user._id)) {
    throw new CustomError("Invalid permission for resource", 403);
  }
};
