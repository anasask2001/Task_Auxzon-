import React from "react";

export const Filter = () => {
  return (
    <div className="w-full h-full bg-white rounded-md shadow-md p-4 ml-3">
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Product Categories</h4>
        <br />
        <div className="space-y-5 text-gray-500">
          <p>Extension</p>
          <p>Mobile Phone Cases</p>
          <p>Power Banks</p>
          <p>Headsets</p>
          <p>Charger and Data Cable</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="mb-5 ">
        <h4 className="text-lg font-semibold">Filter By Price</h4>
        <div className="flex mt-5 justify-between gap-6">
          <button className="px-4 py-1 w-full border-2  rounded-md">399</button>
          <button className="px-4 py-1 w-full border-2  rounded-md">
            11100
          </button>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between gap-6">
        <button className="px-4 py-1 w-full border-2 text-gray-500 rounded-md">
          Reset
        </button>
        <button className="px-4 py-1 w-full  bg-[#4F2C70] text-white rounded-md">
          Apply
        </button>
      </div>
    </div>
  );
};
