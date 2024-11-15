import express from "express"
import { trycatch } from "../middleware/trycatch.js"
import { addcart, deleteCartproducts, viewCartProducts } from "../controller/user/cart_controller.js"

const route = express.Router()
route.post("/:id/cart", trycatch(addcart))
route.get("/:id/cart", trycatch(viewCartProducts))
route.delete("/:id/cart", trycatch(deleteCartproducts))



export default route