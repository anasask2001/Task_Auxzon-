import express from "express"
import { trycatch } from "../middleware/trycatch.js"
import { getProduct } from "../controller/user/product_controller.js"

const route  = express.Router()
route.get("/products",trycatch(getProduct))


export default route