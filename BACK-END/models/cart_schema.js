import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    productid:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
    }
})


const Cart = mongoose.model("Cart",CartSchema)
export{Cart}