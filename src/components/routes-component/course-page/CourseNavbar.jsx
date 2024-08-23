import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import NavProfileMenu from "./NavProfileMenu";
import { useState } from "react";
import axios from "axios";
import baseURL from "../../../config/config";
import RenderRazorpay from "./RenderRazorpay";

const CourseNavbar = ({
  courseId,
  progressCount,
  courseName,
  enrolledStatus,
}) => {
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const navigate = useNavigate();
  const onClickExit = () => {
    navigate("/");
  };
  const createOrderHandler = async () => {
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
              enrolledStatus = true;
              alert(res.data.message);
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
    <div className="w-full h-full flex flex-row items-center justify-between px-4 bg-white border-b border-gray-200">
      <div className="flex gap-2">
        <h1 className="text-lg font-semibold">{courseName}</h1>
        {enrolledStatus === false && (
          <button
            className="px-4 py-2 text-sm text-white bg-violet-500 rounded-md"
            onClick={createOrderHandler}
          >
            Enroll Now
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-4 gap-2 cursor-pointer font-medium"
          onClick={onClickExit}
        >
          Exit
          <IoMdExit className="text-2xl" />
        </button>
        <NavProfileMenu />
      </div>
      {displayRazorpay && (
        <RenderRazorpay
          amount={orderDetails.amount}
          currency={orderDetails.currency}
          orderId={orderDetails.orderId}
          courseId={courseId}
          keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
        />
      )}
    </div>
  );
};

export default CourseNavbar;
