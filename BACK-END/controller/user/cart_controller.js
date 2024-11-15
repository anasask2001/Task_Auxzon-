import mongoose from "mongoose";
import { Product } from "../../models/product_schema.js";
import { User } from "../../models/user_schema.js";


export const addcart = async(req,res)=>{
    const userId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(userId)){
       return res.status(400).json({
            status:'failed',
            message:'invalid user ID format'
        })
    }
    const {productId}=req.body;
    if(!productId){
       return res.status(404).json({
            status:'failed',
            message:'product not found'
        })
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'failed',
            message: 'User not found'
        });
    }
    if (user.cart.includes(productId)) {
        return res.status(409).json({
            status: 'failed',
            message: 'Product already exists in the cart'
        });
    }
    await User.updateOne({_id:userId},{$addToSet:{cart:productId}})
    res.status(200).json({
        status:'success',
        message:'successfully product added to cart'
    })
}


export const viewCartProducts=async(req,res)=>{
    const userId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({
             status:'failed',
             message:'invalid user ID format'
         })
     }
    const user=await User.findById(userId)
    if(!user){
        return res.status(404).json({
            status:'failed',
            message:'user not found'
        })
    }
    const cartUserIds=user.cart;
    if(cartUserIds.length===0){
        return res.status(200).json({
            status:'success',
            message:'user cart is empty',data:[]
        })
    }
    const cartProducts= await Product.find({_id:{$in :cartUserIds}});
        res.status(200).json({
            status:'success',
            message:'successfull fetched cart products',
            data:cartProducts
        })
  }

  export const deleteCartproducts=async(req,res)=>{
    const userId=req.params.id;
    const {productId}=req.body;
    if(!productId){
        return res.status(404).json({status:'failed',message:'product not found'})
    }
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({status:'failed',message:'user not found'})
    }
    await User.updateOne({_id:userId},{$pull:{cart:productId}})
    res.status(200).json({status:'success',message:'successfully remove product'})
  }



