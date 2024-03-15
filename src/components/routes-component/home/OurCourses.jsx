import axios from "axios";
import { CoursesCard } from "../..";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import CourseCardSkeleton from "../../animation/skeletons/CourseCardSkeleton";
import { AlertDispatchContext } from "../../../context/Context";

const OurCourses = () => {
  const { user } = useAuth();
  const disatchAlertHandler = useContext(AlertDispatchContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Course Added to Cart
  const handleAddToCart = (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const token = user.token;
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/users/cart-course/${courseId}`,
      headers: { Authorization: "Bearer " + token },
      withCredentials: true,
    })
      .then((res) => {})
      .catch((err) => {
        disatchAlertHandler({
          type: "error",
          message: err.response.data.message,
        });
      });
  };
  useEffect(() => {
    //Courses imported
    axios({
      method: "get",
      url: `${baseURL}/api/v1/courses`,
    })
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [courses.length]);
  const getAllCourse = courses?.map((course) => (
    <CoursesCard
      key={course._id}
      course={course}
      handleAddToCart={handleAddToCart}
    />
  ));
  return (
    <div className="w-full flex justify-center flex-col">
      <h2 className="md:text-4xl sm:text-3xl text-2xl md:font-semibold font-medium">
        Our Courses
      </h2>
      <div className="w-full border-2 my-2"></div>
      <div className="w-full flex flex-row justify-center items-center flex-wrap gap-10 p-2">
        {loading ? (
          <>
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </>
        ) : (
          getAllCourse
        )}
      </div>
    </div>
  );
};

export default OurCourses;
