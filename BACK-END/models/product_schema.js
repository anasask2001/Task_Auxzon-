import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  discountedPrice: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  hoverIcons: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product",ProductSchema)
export{Product}
