import axios from "axios";
import baseURL from "../../../config/config";
import { useState } from "react";

const CartCard = ({ course, handleCurrentCourseDeletion, handleCourseEnrollment }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const courseId = course._id;

  const paymentHandler = async () => {
    axios({
      method: "POST",
      url: `${baseURL}/api/v1/payment/order`,
      data: {
        courseId: courseId,
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setOrderDetails({
        orderId: res.data.order_id,
        currency: res.data.currency,
        amount: res.data.amount,
      });
      // setDisplayRazorpay(true);
      // console.log(orderDetails);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: orderDetails.currency,
        amount: orderDetails.amount,
        name: "Skillsphere",
        description: "Wallet Transaction",
        image: "http://localhost:1337/logo.png",
        order_id: orderDetails.orderId,
        handler: function (response) {
          console.log(response);
          axios({
            method: "POST",
            url: `${baseURL}/api/v1/payment/success`,
            data: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              courseId: courseId,
            },
            withCredentials: true,
          })
            .then((res) => {
              alert(res.data.message);
              handleCurrentCourseDeletion(courseId)
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data.message);
            });
        },
        theme: {
          color: "#8B5CF6", // Custom color for your checkout modal.
        },
      };


      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };
  return (
    <div className="w-full flex sm:flex-row flex-col gap-3 justify-between rounded-md border-2 p-1 relative">
      <div className="flex gap-2">
        <img src={course.image} alt="" className="sm:w-28 w-20 rounded-md" />
        <div className="flex flex-col">
          <h1 className="md:text-lg font-semibold">{course.title}</h1>
          <p className="text-sm md:block hidden">
            By {course.instructor && course.instructor.instructorName}
          </p>
          <p className="text-sm">Rating</p>
          <p className="text-base md:font-semibold font-medium">
            <span>
              <span className="">Price:</span> ₹{course.price}{" "}
            </span>
            <span className="font-light">{`(${course.discount}% off)`}</span>
          </p>
        </div>
      </div>
      {/* <span className="w-1/6 text-center self-center">{course.discount}%</span>
      <span className="w-1/6 text-center self-center">
        ₹{(course.price - (course.discount / 100) * course.price).toFixed(2)}
      </span> */}
      <div className="flex gap-1 justify-center items-center sm:self-center self-start">
        <button
          className="sm:text-base text-sm text-white bg-violet-500 hover:bg-violet-700 sm:px-3 px-2 sm:py-3 py-2 rounded-md"
          onClick={() => paymentHandler()}
        >
          Checkout
        </button>
        <button
          className="sm:text-base text-sm text-white bg-red-500 hover:bg-red-700 sm:px-3 sm:py-3 px-2 py-2 rounded-md"
          onClick={() => handleCurrentCourseDeletion(course._id)}
        >
          Remove
        </button>
      </div>
      {/* <button className="bg-violet-500 hover:bg-violet-600 text-white md:p-4 p-2 rounded-br-md">
        Checkout
      </button> */}
      {/* <button
        className="absolute right-1 top-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-sm"
        onClick={() => handleCurrentCourseDeletion(course._id)}
      >
        <IoCloseSharp />
      </button> */}
    </div>
  );
};

export default CartCard;
