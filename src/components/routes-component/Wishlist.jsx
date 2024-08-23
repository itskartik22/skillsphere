import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

const Wishlist = () => {
  const [courses, setCourses] = useState([]);
  return (
    <div
      className="md:w-3/4 w-full flex md:flex-row flex-col md:my-8 md:gap-2 gap-5 rounded-md shadow-lg p-4"
      style={{
        minHeight: `calc(100vh - 150px)`,
      }}
    >
      <div className="w-full flex flex-col items-start py-4 md:px-6">
        <h1 className="text-2xl text-center px-3 py-1 rounded-md shadow-md bg-violet-500 text-white mb-2 flex items-center gap-1">
          <FaHeart className="text-xl" /> 
          <span>Your Wishlist</span>
        </h1>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="relative w-full h-full flex flex-col gap-1">
          {courses.length === 0 && (
            <h1 className="text-lg font-semibold flex justify-center h-full items-center">
              <span className="text-center">No Courses in Wishlist</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
