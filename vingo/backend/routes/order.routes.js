import { getMyOrders, placeOrder, updateOrderStatus } from "../controller/order.controller.js"
import isAuth from "../middleware/isAuth.js"
import express from 'express'

const orderRouter=express.Router()

orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-order",isAuth,getMyOrders)
orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateOrderStatus)


export default orderRouter