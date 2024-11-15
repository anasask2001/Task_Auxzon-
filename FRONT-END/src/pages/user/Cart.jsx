import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../../axios_inetrceptor/axios";

const Cart = () => {
  const userid = localStorage.getItem("_id");

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Get_Cart_Products"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${userid}/cart`);
      return response.data;
    },
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await axiosInstance.delete(`/${userid}/cart`, {
        data: { productId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Get_Cart_Products"]);
    },
  });

  if (isLoading) return <div>Loading your cart...</div>;

  if (isError) {
    const errorMessage =
      error?.response?.data?.message || "Error loading cart data.";
    return <div>{errorMessage}</div>;
  }

  const cartData = Array.isArray(data?.data) ? data.data : [];

  const parsePrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.replace("₹", "").replace(",", "").trim());
  };

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((item) => (
            <div key={item?._id} className="flex items-center border-b pb-4">
              <img
                src={item?.image || "https://via.placeholder.com/150"}
                alt={item?.name || "Product Image"}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">
                  {item?.name || "Product Name"}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {item?.brand || "Brand Name"}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-800">
                    ₹{parsePrice(item?.discountedPrice).toFixed(2)}
                  </p>
                  <p className="text-sm line-through text-gray-500">
                    ₹{parsePrice(item?.originalPrice).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item?._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-semibold">
            Total: ₹
            {cartData
              .reduce(
                (total, item) => total + parsePrice(item.discountedPrice),
                0
              )
              .toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
