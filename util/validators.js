import { body, param } from "express-validator";

// format error info in a single sentence
export const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

// validator for registering user
export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .isLength({ min: 2 })
    .withMessage("Name is too short"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .bail()
    .trim()
    .isLength({ min: 9 })
    .withMessage("Phone is too short")
    .isMobilePhone("any"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Enter password with at least 8 characters"),
];

// validator for login
export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Enter password with at least 8 characters"),
];

// add item validator
export const addItemValidator = [
  body("name")
    .notEmpty()
    .withMessage("Item name is required")
    .bail()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Item name must be at least 4 characters"),
  body("description")
    .optional(true)
    .isLength({ min: 4 })
    .withMessage("Item description must be at least 4 characters"),
];
// add item validator
export const editItemValidator = [
  param("id")
    .notEmpty()
    .withMessage("Item id required")
    .trim()
    .isAlphanumeric()
    .withMessage("Invalid item id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid item id length"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Item name must be at least 4 characters"),
  body("description")
    .optional(true)
    .isLength({ min: 4 })
    .withMessage("Item description must be at least 4 characters"),
];

// validator for object id
export const idValidator = [
  param("id")
    .notEmpty()
    .withMessage("Item id required")
    .trim()
    .isAlphanumeric()
    .withMessage("Invalid item id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid item id length"),
];
