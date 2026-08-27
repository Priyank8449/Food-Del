import { getMyOrders, placeOrder } from "../controller/order.controller.js"
import isAuth from "../middleware/isAuth.js"
import express from 'express'

const orderRouter=express.Router()

orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-order",isAuth,getMyOrders)


export default orderRouter