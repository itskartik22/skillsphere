import axios from "axios";
import { CoursesCard, Loader } from ".";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import baseURL from "../config/config";
import { useNavigate } from "react-router-dom";

const OurCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
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
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
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
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);
      });
  }, [courses.length]);
  const getAllCourse = courses?.map((course) => (
    <CoursesCard
      key={course._id}
      course={course}
      handleAddToCart={handleAddToCart}
    />
  ));
  if (isFetching) return <Loader />;

  return (
    <div className="w-full flex justify-center flex-col">
      <h2 className="md:text-4xl sm:text-3xl text-2xl md:font-semibold font-medium">
        Our Courses
      </h2>
      <div className="w-full border-2 my-2"></div>
      <div className="w-full flex flex-row justify-evenly items-center flex-wrap gap-10 p-2">
        {/* <CoursesCard /> */}
        {getAllCourse}
      </div>
    </div>
  );
};

export default OurCourses;
