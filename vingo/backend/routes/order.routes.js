import { placeOrder } from "../controller/order.controller.js"
import isAuth from "../middleware/isAuth.js"
import express from 'express'

const orderRouter=express.Router()

orderRouter.post("/place-order",isAuth,placeOrder)


export default orderRouter