import { errorFormatter } from "../util/validators.js";
import { validationResult } from "express-validator";
import { removeUpload } from "../util/helpers.js";
import multer from "multer";
import { CustomError } from "../util/errors.js";

// middleware for request data validation
export const validateData = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validation) => validation.run(req)));
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      removeUpload(req.file);
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  };
};

//  middleware for avatar validator
export const validateAvatar = (req, res, next) => {
  const uploader = imageUploader("avatar");
  uploader(req, res, (err) => {
    if (err instanceof CustomError) {
      //   validation error
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: "Image Upload error" });
    }
    next();
  });
};
//  middleware for item image validator
export const validateItemImage = (req, res, next) => {
  const uploader = imageUploader("itemImage");
  uploader(req, res, (err) => {
    if (err instanceof CustomError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
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
    return cb(new CustomError("Image must be jpg, jpeg or png"), false);
  }
  cb(null, true);
};

// multer instance with configuration
const imageUploader = (fieldname) => {
  return multer({
    storage,
    fileFilter: fileValidator,
  }).single(fieldname);
};
