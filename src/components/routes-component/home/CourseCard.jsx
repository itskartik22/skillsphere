import courseImg from "./../../../img/courseImg.png";
import { useState } from "react";

const CoursesCard = ({ course, handleAddToCart }) => {
  const [enrollBtnText, setEnrollBtnText] = useState("Enroll Now");
  const handleBtnAction = () => {
    handleAddToCart(course._id);
    setEnrollBtnText("Added to Cart");
  };
  return (
    <div
      className="relative flex flex-col gap-2 shadow-md rounded-lg"
      style={{
        width: "300px",
        height: "400px",
      }}
    >
      <img src={courseImg} alt="course-img" className="rounded-t-lg" />
      <div className="px-3">
        <h1 className="course-name text-lg font-semibold justify-items-start">
          {course.title}
        </h1>
        <p>{course.courseDescription}</p>
      </div>
      <div className="w-full flex flex-col absolute bottom-0">
        <div className="w-full flex justify-between text-xl px-3 py-2">
          <p>Price :-</p>
          <span>
            <span className="text-red-500 text-sm">
              ({course.discount}% Discount)
            </span>{" "}
            ₹ {course.price}/-
          </span>
        </div>
        <div className="w-full flex">
          <button className="w-1/2 text-black hover:bg-gray-100 focus:ring-4 focus:ring-violet-300 font-medium rounded-bl-lg text-base px-6 py-2.5 focus:outline-none">
            Explore
          </button>
          <button
            className="w-1/2 text-white bg-violet-500 hover:bg-violet-700 font-medium rounded-br-lg text-base px-2 py-2.5"
            onClick={() => handleBtnAction()}
          >
            {enrollBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
