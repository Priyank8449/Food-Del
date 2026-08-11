import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createEditShop } from "../controller/shop.controller.js"
import { addItem, editItem } from "../controller/item.controller.js"
import { upload } from "../middleware/multer.js"

const itemRouter=express.Router()


itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.put("/edit-item/:itemId",isAuth,upload.single("image"),editItem)


export default itemRouter