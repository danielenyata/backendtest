const {check} = require("express-validator")



const ValidateUser = [
    check("firstName", "Name should be 3 or more characters").isLength({min:3}),
    check("lastName", "last name should be 3 or more characters").isLength({min:3}),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be 6 or more characters").isLength({min:6}),
    
]

module.exports = {ValidateUser}