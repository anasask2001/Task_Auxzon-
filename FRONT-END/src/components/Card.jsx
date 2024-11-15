import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axiosInstance from "../axios_inetrceptor/axios";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate()
  const userid = localStorage.getItem("_id");

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/${userid}/cart`, {
        productId: product._id,
        quantity: 1,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Item added to cart!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add item to cart.";
        toast.error(errorMessage);
      
    },
    onSettled: () => {
      console.log("Add to cart mutation completed.");
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  return (
    <div className="relative flex flex-col items-center w-full sm:w-64 p-4 m-4 bg-white rounded-lg shadow-md">
      <div
        className={`relative w-full rounded-lg overflow-hidden ${
          product.hoverIcons ? "hover:bg-gray-100" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />

        {product.offer && (
          <div className="absolute top-2 left-1 bg-[#4F2C70] px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg z-10">
            {product.offer}
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md">
            <i className="fas fa-heart text-purple-700"></i>
          </button>
          <button className="p-2 bg-white rounded-full shadow-md">
            <i className="fas fa-search text-purple-700"></i>
          </button>
        </div>

        {product.hoverIcons && (
          <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-700 bg-opacity-30">
            <button className="p-2 bg-white rounded-full mx-1 shadow-md">
              <i className="fas fa-search"></i>
            </button>
            <button className="p-2 bg-white rounded-full mx-1 shadow-md">
              <i className="fas fa-heart"></i>
            </button>
            <button className="p-2 bg-white rounded-full mx-1 shadow-md">
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        )}
      </div>

      <h3 className="mt-4 text-lg sm:text-xl font-semibold text-center">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500">{product.brand}</p>

      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas fa-star ${
              i < product.rating ? "text-[#4F2C70]" : "text-gray-300"
            }`}
          ></i>
        ))}
      </div>

      <div className="flex items-center mt-2">
        <span className="text-sm font-bold text-gray-700 line-through">
          {product.originalPrice}
        </span>
        <span className="ml-2 text-lg font-bold text-[#4F2C70]">
          {product.discountedPrice}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full p-2 text-yellow-600 bg-[#4F2C70] hover:bg-purple-800 rounded-md text-sm sm:text-base"
        disabled={addToCartMutation.isLoading}
      >
        {addToCartMutation.isLoading ? "Adding..." : "Add To Cart"}
      </button>
    </div>
  );
};

export default Card;
