import express from "express"
import { trycatch } from "../middleware/trycatch.js"
import {  confirmOrder, getAdminUserCart } from "../controller/admin/admin_controller,.js"

const route = express.Router()
route.get("/admin/carts",trycatch(getAdminUserCart))
route.post("/admin/:id/order",trycatch(confirmOrder))




export default route