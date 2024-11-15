import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middleware/error.js"
import product_route from "./routes/product_route.js"
import auth_route from "./routes/auth_route.js"
import cart_route from "./routes/cart_route.js"
import admin_route from "./routes/admin_route.js"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api",auth_route)
app.use("/api",product_route)
app.use("/api",cart_route)
app.use("/api",admin_route)
app.use(errorHandler)


export default app