import { useEffect, useState } from "react";
import { CartCard, Loader } from "../..";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import CartCardSkeleton from "../../animation/skeletons/CartCardSkeleton";

const CourseCart = () => {
  const { user } = useAuth();
  const token = user.token;
  const [totalCost, setTotalCost] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  useEffect(() => {
    //Fetching Cart Courses
    axios({
      method: "get",
      url: `${baseURL}/api/v1/users/cart-courses`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setLoading(false);
        setCourses(res.data.data.cartCourses);
      })
      .catch((err) => {
        alert(err.message);
      });
    //Calling Cost Variable Calculation Function
    function costVariable() {
      let costSum = 0;
      let discountSum = 0;
      let itemCnt = 0;
      courses.forEach((course) => {
        costSum += course.price - (course.discount / 100) * course.price;
        discountSum += (course.discount / 100) * course.price;
        itemCnt++;
      });
      setTotalCost(costSum.toFixed(2));
      setTotalDiscount(discountSum.toFixed(2));
      setItemCount(itemCnt);
      return null;
    }
    costVariable();
    //Setting isPaymentProcessing False
    setTimeout(() => {
      setIsPaymentProcessing(false);
    }, 3000);
  }, [courses.length, token, courses]);
  //Setting isPaymentProcessing True
  const handlePaymentProcessing = () => {
    if (courses.length === 0) {
      alert("No Course in Cart!");
      return;
    }
    const cartCourseIds = courses.map((course) => course._id);
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/users/enroll-courses`,
      headers: { Authorization: "Bearer " + token },
      data: {
        courseIds: cartCourseIds,
      },
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.data.message);
      });
    setIsPaymentProcessing(true);
  };

  const handleCourseDeletionById = (courseId) => {
    axios({
      method: "delete",
      url: `${baseURL}/api/v1/users/cart-course/${courseId}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        const remainingCourses = courses.filter(
          (course) => course._id !== courseId
        );
        setCourses(remainingCourses);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  //Cost Variable Calculating Function
  if (isPaymentProcessing) return <Loader />;
  return (
    <div
      className="md:w-3/4 w-full flex md:flex-row flex-col md:my-8 md:gap-2 gap-5 rounded-md shadow-lg p-4"
      style={{
        minHeight: `calc(100vh - 150px)`,
      }}
    >
      <div className="md:w-2/3 flex flex-col items-start py-4 md:px-6 gap-2">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="w-full flex">
          <span className="w-3/5 md:text-center px-2">Items</span>
          <span className="w-1/5 text-center md:inline-block hidden">
            Discount(%)
          </span>
          <span className="w-1/5 text-center md:inline-block hidden">
            Price
          </span>
        </div>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="w-full flex flex-col gap-1">
          {loading ? (
            <>
              <CartCardSkeleton />
              <CartCardSkeleton />
              <CartCardSkeleton />
            </>
          ) : (
            courses?.map((course) => (
              <CartCard
                key={course._id}
                course={course}
                handleCurrentCourseDeletion={handleCourseDeletionById}
              />
            ))
          )}
        </div>
      </div>
      <div className="md:w-1/3 flex flex-col items-start gap-2 border-l-2 shadow-slate-500 py-4 px-6">
        <h1 className="text-2xl font-semibold">Order Summary</h1>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="w-full flex justify-between items-center text-base">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="w-full flex justify-between items-center text-base">
          <span>Tax</span>
          <span>+18% (GST included)</span>
        </div>
        <div className="w-full flex justify-between items-center text-base">
          <span>Discount</span>
          <span>- ₹{totalDiscount}</span>
        </div>
        <div className="w-full flex flex-col text-base gap-2">
          <span>Promo Code</span>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              placeholder="Apply Promo Code"
              className="w-full border-2 px-2"
            />
            <button className="text-white bg-gray-950 hover:bg-gray-900  font-medium text-base px-5 py-1.5 focus:outline-none">
              Apply
            </button>
          </div>
        </div>
        <div
          className="w-full bg-gray-300 mt-2"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="w-full flex justify-between items-center text-lg font-semibold">
          <span>Total Cost</span>
          <span>₹ {totalCost} /-</span>
        </div>
        <button
          className="w-full text-white bg-violet-500 hover:bg-violet-700 focus:ring-4 focus:ring-violet-300 font-medium text-lg px-6 py-1.5 focus:outline-none"
          onClick={() => handlePaymentProcessing()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CourseCart;
