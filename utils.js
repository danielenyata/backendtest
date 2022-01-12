
const bcrypt = require("bcryptjs");


const hashPassword = async (pass) => {
  // add salt and hash password
  const salt = await bcrypt.genSalt();
  let password = await bcrypt.hash(pass, 12);
  return password;
};
module.exports = { hashPassword};
