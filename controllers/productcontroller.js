const mongoose = require("mongoose")
const Item = require("../model/items")


const addItem = async (req, res)=>{
    const{title, description, price} = req.body
    
    const item = await Item.create({
        title,
        description, 
        price
    })
    res.json({item})
    
}

const findItemByTitle = async (req, res)=>{
    const {title} = req.params
   let searchedItem = await Item.findOne({title:title})
    if(searchedItem){
        return res.json({searchedItem})
    }
    return res.json({msg: "item does not exist"})
}


const deleteItemByTitle = async(req, res)=>{
    const {title} = req.params
    let itemToDelete = await Item.findOne({title:title})
    if(itemToDelete){
        let deletedItem = await Item.deleteOne(itemToDelete).then(res.json({msg:`${itemToDelete.title} deleted Succesfully`}))
       return deletedItem

    }
    return res.json({msg:"item does not exist"})


}


const listItems = async(req, res)=>{
    const items = await Item.find().then((result)=>{
        
            res.json({items:result})
        
    })
}

const updateItem = async(req, res)=>{
    const {titles} = req.params
    const { title, description, price} = req.body
    const itemToUpdate = await Item.findOne({title:titles})
    if(itemToUpdate){
        const item =await Item.updateOne({title:titles}, {$set:{
            title,
            description, 
            price
        }}).then(res.json({msg: `${itemToUpdate.title} updated successfully`})).catch((error)=>{
            res.send(`${error}`)
        })
        return item
    }return res.status(404).json({msg: `${titles} not Found`})
}
module.exports = {addItem, findItemByTitle, deleteItemByTitle, listItems, updateItem}

