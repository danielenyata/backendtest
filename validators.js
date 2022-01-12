import { body } from "express-validator";

// format error info in a single sentence
export const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

// validator for registering user
export const RegisterValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .trim()
    .isAlphanumeric()
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
    .withMessage("Enter password with at least 8 characters")
];

// validator for login
export const LoginValidator = [
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
    .withMessage("Enter password with at least 8 characters")
];
