import { errorFormatter } from "../util/validators.js";
import { validationResult } from "express-validator";
import multer from "multer";
import fs from "fs";

// middleware for request data validation
export const validateData = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validation) => validation.run(req)));
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("error deleting");
          else console.log("deleted");
        });
      }
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  };
};

//  middleware for image validator
export const validateImage = (req, res, next) => {
  imageUploader(req, res, (err) => {
    if (err && "code" in err) {
      //   validation error
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: "Image Upload error" });
    }
    next();
  });
};

// configuration and functions for image validator
const ACCEPTED_MIMES = ["image/png", "image/jpg", "image/jpeg"];

// storage config for multer
const storage = multer.diskStorage({
  // directory for storing images
  destination: function (req, file, cb) {
    cb(null, `./uploads/${file.fieldname}s`);
  },
  // unique filename
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

// image validator config
const fileValidator = (req, file, cb) => {
  if (!ACCEPTED_MIMES.includes(file.mimetype)) {
    const error = new Error();
    error.message = "Image must be jpg, jpeg or png";
    error.code = "CUSTOM";
    return cb(error, false);
  }
  cb(null, true);
};

// multer instance with configuration
const imageUploader = multer({
  storage,
  fileFilter: fileValidator,
}).single("avatar");
