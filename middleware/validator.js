import { errorFormatter } from "../util/validators.js";
import { validationResult } from "express-validator";

export const validateData = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validation) => validation.run(req)));
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  };
};
