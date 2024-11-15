import { Product } from "../../models/product_schema.js";

export const getProduct = async (req, res) => {
   const products = await Product.find()
   if(!products){
    return res.status(404).json({status:"failed",message:"products not found"})
   }
   res.status(200).json(products);
};



