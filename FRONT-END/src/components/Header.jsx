import React from "react";

const Header = () => (
  <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 space-y-4 md:space-y-0">
    <h1 className="text-lg md:text-xl font-semibold text-center md:text-left">
      Mobile Accessories
    </h1>

    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="text-gray-600 text-sm md:text-base">
        Show:
        <span className="ml-2 cursor-pointer hover:underline">9</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="cursor-pointer hover:underline">12</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="cursor-pointer hover:underline">18</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="cursor-pointer hover:underline">24</span>
      </div>

      <div className="flex items-center space-x-2 text-gray-500">
        <button className="p-1 hover:bg-gray-200 rounded">
          <i className="fas fa-th-large"></i>
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <i className="fas fa-th-list"></i>
        </button>
      </div>

      <select className="p-2 border border-gray-300 rounded bg-white text-gray-700 text-sm md:text-base">
        <option>Sort by popularity</option>
        <option>Sort by price: low to high</option>
        <option>Sort by price: high to low</option>
        <option>Sort by rating</option>
      </select>
    </div>
  </div>
);

export default Header;
