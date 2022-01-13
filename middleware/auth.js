import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { CustomError } from "../util/errors.js";
const { TokenExpiredError } = jwt;

// Check and verify  JWT in request
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // return unauthenticated if theres no token
  if (token === null) return res.sendStatus(401);

  // verify token and get associated user
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    // unauthorised
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.sendStatus(401);
    }
    // set user object if authenticated
    try {
      const user = await User.findOne({ email: payload.email });
      if (!user) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
    } catch (error) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    next();
  });
};

// helpers
export const createJWT = ({ email, name }, duration = "1h") => {
  if (!(email || name)) {
    throw new CustomError("Could not authenticate");
  }
  return jwt.sign({ email, name }, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
