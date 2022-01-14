
const User = require('../model/user')
const {hashPassword} = require("../utils")
const {validationResult} = require("express-validator")
const { application } = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const signUp =async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const {firstName, lastName, email, password} = req.body
    const hashed = await hashPassword(password)
   
   
   const result =  await User.create({
        firstName,
        lastName,
        email,
        password:hashed
    }, (error)=>{
        if(error){
            res.json({msg:"Email already exists"})
        }else{
            res.json({msg:"success"})
        }
    })
}

const signIn = async (req, res)=>{
    
    const {email, password} = req.body;

    //check if password matches
    let user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json({msg:"invalid Credentials"})
    }
    let hashed = await bcrypt.compare(password, user.password);
    
    
    if(!hashed){
        return res.status(400).json({msg:"Invalid credentials"})
    }
    //Generate token
    const token = jwt.sign({_id:user._id}, process.env.Secret)
    // res.json({token})
    //put token into cookie
    res.cookie('token', token, new Date()+1)
    //Send response to frontend.
    const {_id} = user
    return res.json({
        token,
        user:{_id,  email}
        
    })
}

const getAllUsers = async (req, res)=>{
    const users = await User.find().then((result)=>{
        res.json({allUSers:result})
    }).catch((error)=>{
        console.log(error)
    })
}

const userInfo = async (req, res)=>{
    const {user} = req.params
    let info = await User.findOne({email:user})
    if (info){
        return res.json({info})
    } return res.json({msg: `${user} does not exist in the Database`})
}
module.exports ={signUp, signIn, getAllUsers, userInfo}