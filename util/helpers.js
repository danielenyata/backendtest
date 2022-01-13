import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const DIR = path.join(__dirname, "../");

// remove/undo file upload when error occurs
export const removeUpload = (file) => {
  if (!file) return;
  fs.unlink(file.path, (err) => {
    if (err) console.log("error deleting");
    else console.log("deleted");
  });
};
// remove file
export const removeFile = (filepath) => {
  if (!filepath) return;
  fs.unlink(path.join(DIR, filepath), (err) => {
    if (err) console.log("error deleting");
    else console.log("deleted");
  });
};

console.log(DIR);
