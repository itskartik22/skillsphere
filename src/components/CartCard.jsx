import Img from "./../img/CartCardImg.png";
import { IoCloseSharp } from "react-icons/io5";

const CartCard = ({ course, handleCurrentCourseDeletion }) => {
  return (
    <div className="w-full flex rounded-md border-2 p-1 relative">
      <div className="w-3/5 flex gap-2">
        <img src={Img} alt="" className="rounded-md" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{course.title}</h1>
          <p className="text-sm">
            By {course.instructor && course.instructor.instructorName}
          </p>
          <p className="text-sm">Rating</p>
          <p className="text-base font-semibold">Price: ₹{course.price} </p>
        </div>
      </div>
      <span className="w-1/5 text-center self-center">{course.discount}%</span>
      <span className="w-1/5 text-center self-center">
        ₹{(course.price - (course.discount / 100) * course.price).toFixed(2)}
      </span>
      <button
        className="absolute right-1 top-1 bg-red-800 hover:bg-red-700 text-white p-1 rounded-sm"
        onClick={() => handleCurrentCourseDeletion(course._id)}
      >
        <IoCloseSharp />
      </button>
    </div>
  );
};

export default CartCard;
