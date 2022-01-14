import fs from "fs";

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
  fs.unlink(filepath, (err) => {
    if (err) console.log("error deleting");
    else console.log("deleted");
  });
};
