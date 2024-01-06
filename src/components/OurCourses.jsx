import axios from "axios";
import { CoursesCard } from ".";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const OurCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [courseLength, setCourseLength] = useState(0);
  console.log(typeof courses);
  // Course Added to Cart
  const handleAddToCart = (courseId) => {
    const token = user.token;
    axios({
      method: "patch",
      url: `/api/v1/users/cart-course/${courseId}`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    //Courses imported
    axios
      .get("/api/v1/courses")
      .then((res) => {
        setCourses(res.data.courses);
        setCourseLength(courses.length);
      })
      .catch((err) => {
        alert(err.response.data.data.message);
      });
  }, [courseLength]);
  const getAllCourse = courses?.map((course) => (
    <CoursesCard
      key={course._id}
      course={course}
      handleAddToCart={handleAddToCart}
    />
  ));

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-4xl font-semibold">Our Courses</h2>
      <div className="w-full border-2 my-2"></div>
      <div className="w-full flex flex-row justify-evenly items-center flex-wrap gap-10 p-2">
        {/* <CoursesCard /> */}
        {getAllCourse}
      </div>
    </div>
  );
};

export default OurCourses;
