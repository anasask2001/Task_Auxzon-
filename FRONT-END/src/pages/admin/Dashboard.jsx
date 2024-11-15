import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../../axios_inetrceptor/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { data: users } = useQuery({
    queryKey: ["Get_Cart_Products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/carts");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.post(`/admin/${userId}/order`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        "Error confirming order: " + error.response?.data?.message ||
          error.message
      );
    },
  });

  const handleConfirm = (userId) => {
    mutation.mutate(userId);
  };
if(!users) return <div className="text-center">Dashboard is empty</div>
  return (
    <div className="dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        User Cart Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users>0&&users?.map((user) => {
          const totalPrice = user.cart.reduce((sum, item) => {
            return (
              sum +
              parseFloat(item.discountedPrice.replace("₹", "").replace(",", ""))
            );
          }, 0);


          return (
            <div
              key={user._id}
              className="user-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {user.email}
              </h3>
              <h4 className="text-lg font-bold text-gray-600 mt-4">
                Cart Items:
              </h4>
              <ul className="cart-items space-y-4 mt-2">
                {user.cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center space-x-4 border-b pb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Original Price: {item.originalPrice}
                      </p>
                      <p className="text-sm text-green-600 font-bold">
                        Discounted Price: {item.discountedPrice}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price font-semibold text-gray-800 mt-4">
                Total Price:{" "}
                <span className="text-green-700">₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleConfirm(user._id)}
                className="confirm-btn bg-[#4F2C70] text-white mt-4 px-6 py-2 rounded-md hover: text-yellow-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Confirming..." : "Confirm Order"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
