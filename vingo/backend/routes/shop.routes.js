import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createEditShop, getMyShop } from "../controller/shop.controller.js"
import { upload } from "../middleware/multer.js"

const shopRouter=express.Router()


shopRouter.post("/create-edit",isAuth,upload.single("image"),createEditShop)
shopRouter.get("/get-my",isAuth,getMyShop)


export default shopRouter