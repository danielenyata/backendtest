const express = require("express");
const app = express()
const mongoose = require("mongoose")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = process.env.PORT || 8080;
const {signUp, signIn} = require("./controllers/userControllers")
const {check} = require("express-validator")
const {ValidateUser} = require("./middlewares/Validators")
const {addItem, findItemByTitle, deleteItemByTitle, listItems} = require("./controllers/productcontroller")


//connecting to mongoose
mongoose.connect(process.env.DATABASE, (error)=>{
    if(!error){
        console.log("database connected succesfully")
    }else{
        console.log("Problem connecting to database")
    }
})

//Using middlewares
app.use(bodyParser.json());
app.use(cookieParser())


app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/api/signup', [...ValidateUser], signUp)
app.post('/api/signIn', signIn)
app.post("/addItem", addItem)
app.get("/api/:title", findItemByTitle)
app.delete("/api/delete/:title", deleteItemByTitle)

app.get("/items", listItems )




app.listen(port, (error)=>{
    if(!error){
        console.log(`Server running on port: ${port}`)
    }else{
        console.log("problem connecting to server")
    }
})
