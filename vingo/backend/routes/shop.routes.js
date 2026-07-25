import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createEditShop } from "../controller/shop.controller.js"

const shopRouter=express.Router()


shopRouter.get("/create-edit",isAuth,upload.single("image"),createEditShop)


export default shopRouter