import React from "react";
import { Filter } from "../pages/user/Filter";
import Card from "../components/Card";
import Header from "../components/Header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios_inetrceptor/axios";

const Layout = () => {
  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Get_Products"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products`);
      return response.data;
    },
  });

  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading products
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* Sidebar Section */}
      <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
        <Filter />
      </div>

      {/* Main Content Section */}
      <div className="w-full lg:w-3/4 p-4">
        <Header />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
