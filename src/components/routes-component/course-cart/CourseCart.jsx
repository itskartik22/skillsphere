import { useContext, useEffect, useState } from "react";
import { CartCard, Loader } from "../..";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import CartCardSkeleton from "../../animation/skeletons/CartCardSkeleton";
import { AlertDispatchContext } from "../../../context/Context";

const CourseCart = () => {
  const { user, sessionExpiredLogout } = useAuth();
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const [totalCost, setTotalCost] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const token = user.token;
  useEffect(() => {
    //Fetching Cart Courses
    axios({
      method: "get",
      url: `${baseURL}/api/v1/users/cart-courses`,
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setCourses(res.data.data.cartCourses);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.request.status === 401) {
          dispatchAlertHandler({
            type: "error",
            message: "Session Expired",
          });
          sessionExpiredLogout();
        } else {
          dispatchAlertHandler({
            type: "error",
            message: "Something went wrong",
          });
        }
        // alert(err.response.data.message);
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
  }, []);
  //Setting isPaymentProcessing True
  const handlePaymentProcessing = () => {
    if (courses.length === 0) {
      dispatchAlertHandler({
        type: "error",
        message: "No course in cart!",
      });
      return;
    }
    const cartCourseIds = courses.map((course) => course._id);
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/users/enroll-courses`,
      // headers: { Authorization: "Bearer " + token },
      data: {
        courseIds: cartCourseIds,
      },
      withCredentials: true,
    })
      .then((res) => {
        dispatchAlertHandler({
          type: "success",
          message: res.data.message,
        });
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "success",
          message: err.response.data.data.message,
        });
      });
    setIsPaymentProcessing(true);
  };

  const handleCourseEnrollmentById = (courseId) => {
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/users/enroll-course/${courseId}`,
      headers: { Authorization: "Bearer " + token },
      withCredentials: true,
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
  }

  const handleCourseDeletionById = (courseId) => {
    axios({
      method: "delete",
      url: `${baseURL}/api/v1/users/cart-course/${courseId}`,
      // headers: { Authorization: "Bearer " + token },
      withCredentials: true,
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
      <div className="w-full flex flex-col items-start py-4 md:px-6">
        <h1 className="text-2xl font-semibold mb-2">Your Cart</h1>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
        <div className="w-full flex items-center py-3">
          <span className="md:text-center font-medium px-2">Items</span>
        </div>
        {/* <table className="w-full flex-col gap-2">
          <thead>
            <tr className="text-left flex my-3 mx-2">
              <th className="w-3/6">Items</th>
            </tr>
          </thead>
          <div
            className="w-full bg-gray-300"
            style={{
              height: "2px",
            }}
          ></div>
          <tbody>
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
          </tbody>
        </table> */}
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
                handleCourseEnrollment={handleCourseEnrollmentById}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
