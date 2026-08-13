import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createEditShop } from "../controller/shop.controller.js"
import { addItem, deleteItem, editItem, getItemById } from "../controller/item.controller.js"
import { upload } from "../middleware/multer.js"

const itemRouter=express.Router()


itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.put("/edit-item/:itemId",isAuth,upload.single("image"),editItem)
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById)
itemRouter.delete("/delete/:itemId",isAuth,deleteItem)


export default itemRouter