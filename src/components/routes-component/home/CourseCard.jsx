// import courseImg from "./../../../img/courseImg.png";
import { useState } from "react";

const CoursesCard = ({ course, handleAddToCart }) => {
  const [enrollBtnText, setEnrollBtnText] = useState("Enroll Now");
  const handleBtnAction = () => {
    handleAddToCart(course._id);
    setEnrollBtnText("Added to Cart");
  };
  return (
    <div
      className="xsm:w-auto w-[280px] max-w-[350px] h-[350px] relative flex flex-col flex-auto gap-2 shadow-md rounded-lg"
    >
      <img src={course.image} alt="course-img" className="rounded-t-lg w-full h-1/2 object-cover" />
      <div className="px-3">
        <h1 className="course-name text-lg font-semibold justify-items-start">
          {course.title}
        </h1>
        <p className="text-sm truncate ">{course.description}</p>
      </div>
      <div className="w-full flex flex-col absolute bottom-0">
        <div className="w-full flex gap-3 text-lg px-3 py-2">
          <p>Price :-</p>
          <span>
            ₹ {course.price}/-
            <span className="text-red-500 text-sm">
              ({course.discount}% off)
            </span>{" "}
          </span>
        </div>
        <div className="w-full flex">
          <button className="w-1/2 text-black hover:bg-gray-100 focus:ring-4 focus:ring-violet-300 font-medium rounded-bl-lg text-base px-6 py-2.5 focus:outline-none"
            onClick={() => window.location.href = `/course/${course._id}`}
          >
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
