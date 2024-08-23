import { useContext, useEffect, useState } from "react";
import { CartCard, Loader } from "../..";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import CartCardSkeleton from "../../animation/skeletons/CartCardSkeleton";
import { AlertDispatchContext } from "../../../context/Context";
import { MdShoppingCart } from "react-icons/md";

const CourseCart = () => {
  const { user, sessionExpiredLogout } = useAuth();
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const [totalCost, setTotalCost] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);

  // const handleCourseEnrollmentById = (courseId) => {
  //   axios({
  //     method: "patch",
  //     url: `${baseURL}/api/v1/users/enroll-course/${courseId}`,
  //     headers: { Authorization: "Bearer " + token },
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       const remainingCourses = courses.filter(
  //         (course) => course._id !== courseId
  //       );
  //       setCourses(remainingCourses);
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       alert(err.response.data.message);
  //     });
  // }

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
  return (
    <div
      className="md:w-3/4 w-full flex md:flex-row flex-col md:my-8 md:gap-2 gap-5 rounded-md shadow-lg p-4"
      style={{
        minHeight: `calc(100vh - 150px)`,
      }}
    >
      <div className="w-full flex flex-col items-start py-4 md:px-6">
        <h1 className="text-2xl text-center px-3 py-1 rounded-md shadow-md bg-violet-500 text-white mb-2 flex items-center gap-1"><MdShoppingCart className="inline-block" /><span>Your Cart</span></h1>
        <div
          className="w-full bg-gray-300"
          style={{
            height: "2px",
          }}
        ></div>
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
        <div className="relative w-full h-full flex flex-col gap-1">
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
          {courses.length === 0 && (
            <h1 className="text-lg font-semibold flex justify-center h-full items-center">
              <span className="text-center">No Courses in Cart</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
