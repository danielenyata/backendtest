export const genUsername = (fname, lname) => {
  let usrn = fname.slice(0, 2) + lname.slice(0, 2);
  usrn += Math.random()
    .toString()
    .slice(2, 12 - usrn.length);
  return usrn;
};
