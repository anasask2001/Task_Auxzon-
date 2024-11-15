import express from "express";
import { trycatch } from "../middleware/trycatch.js";
import { login, register } from "../controller/user/user_controller.js";

const route = express.Router()
route.post("/register",trycatch(register))
route.post("/login",trycatch(login))


export default route