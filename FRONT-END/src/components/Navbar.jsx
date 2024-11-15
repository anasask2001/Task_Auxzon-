import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { CiHeart, CiShuffle } from "react-icons/ci";
import { PiWindowsLogo } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios_inetrceptor/axios";
import { toast } from "react-toastify";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const isAdmin = location.pathname === "/admin/dashboard";

  const logout = () => {
    localStorage.clear(); 
    navigate("/");
  };

  const userId = localStorage.getItem("_id");
  const { data = [] } = useQuery({
    queryKey: ["Get_Cart_Products", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/${userId}/cart`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message); 
    },
  });

  const cartItemCount = Array.isArray(data?.data) ? data.data.length : 0;

  return (
    <>
      {!isAdmin ? (
        <nav className="bg-gray-100 px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-1 flex items-center space-x-2">
                <button className="bg-[#4F2C70] text-white p-2 rounded-full">
                  <Link to="/">
                    <PiWindowsLogo className="h-6 w-6 text-yellow-600" />
                  </Link>
                </button>
                <span className="text-gray-800 font-semibold hidden sm:inline">
                  All Categories
                </span>
              </div>
            </div>

            <div className="hidden md:flex space-x-4">
              <p  className="text-gray-600 hover:text-gray-800">
                Deals
              </p>
              <p  className="text-gray-600 hover:text-gray-800">
                Shop
              </p>
              <p  className="text-gray-600 hover:text-gray-800">
                Our Contacts
              </p>
              <p  className="text-gray-600 hover:text-gray-800">
                Stores
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-gray-600 relative">
              <div className="bg-white rounded-full p-2">
                <Link to="/login">
                  <AiOutlineUser className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <div className="text-gray-600 relative">
              <div className="bg-white rounded-full p-2">
                <CiShuffle className="h-6 w-6" />
              </div>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-black bg-white rounded-full">
                0
              </span>
            </div>

            <div className="relative text-gray-600">
              <div className="bg-white rounded-full p-2">
                <CiHeart className="h-6 w-6" />
              </div>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-black bg-white rounded-full">
                0
              </span>
            </div>

            <div className="relative">
              <div className="bg-[#4F2C70] rounded-full p-2">
                <Link to="/cart">
                  <AiOutlineShoppingCart className="h-6 w-6 text-yellow-600" />
                </Link>
              </div>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-[#4F2C70] rounded-full">
                {cartItemCount}
              </span>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-[#4F2C70] p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <ul className="flex space-x-4">
              <li>
                <p  className="hover:text-gray-300">
                  Dashboard
                </p>
              </li>
              <li>
                <p className="hover:text-gray-300">
                  Users
                </p>
              </li>
              <li>
                <p  className="hover:text-gray-300">
                  Orders
                </p>
              </li>
              <li>
                <p  className="hover:text-gray-300">
                  Settings
                </p>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
