import { User } from "../models/User.js";
import { CustomError, handleError } from "../util/errors.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, filter(req.user));
    res.status(200).json({ users });
  } catch (error) {
    handleError(res, error, "Could not fetch user");
  }
};

export const getProfile = (req, res) => {
  try {
    const { user } = req;
    res.status(200).json({ user });
  } catch (error) {
    handleError(res, error, "Could not fetch user");
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, filter(req.user));
    if (!user) {
      throw new CustomError("Not found", 404);
    }
    res.status(200).json({ user });
  } catch (error) {
    handleError(res, error, "Could not fetch user");
  }
};

const filter = (user) => {
  return user.isAdmin ? "" : "-_id -password -isAdmin";
};
