import { acceptOrder, getCurrentOrder, getDeliveryBoyAssignment, getMyOrders, getOrderById, placeOrder, updateOrderStatus } from "../controller/order.controller.js"
import isAuth from "../middleware/isAuth.js"
import express from 'express'

const orderRouter=express.Router()

orderRouter.post("/place-order",isAuth,placeOrder)
orderRouter.get("/my-order",isAuth,getMyOrders)
orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateOrderStatus)
orderRouter.get("/get-assignments",isAuth,getDeliveryBoyAssignment)
orderRouter.get("/accept-order/:assignmentId",isAuth,acceptOrder)
orderRouter.get("/get-current-order",isAuth,getCurrentOrder)
orderRouter.get("/get-order-by-id/:orderId",isAuth,getOrderById)


export default orderRouter