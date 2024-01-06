import axios from "axios";
import { EnrolledCourseCard } from ".";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const EnrolledCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const token = user.token;
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/v1/users/enrolled-courses",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setCourses(res.data.data.coursesEnrolled);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [courses.length]);
  if (courses.length === 0) {
    return (
      <div className="w-3/4 px-2 py-8 justify-items-center">
        <div className="flex flex-col w-full">
          <h2 className="text-4xl font-semibold">Enrolled Courses</h2>
          <div className="w-full border-2 my-2"></div>
          <div className="w-full text-lg">No Courses Enrolled</div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-3/4 px-2 py-8 justify-items-center">
      <div className="flex flex-col w-full">
        <h2 className="text-4xl font-semibold">Enrolled Courses</h2>
        <div className="w-full border-2 my-2"></div>
        <div className="w-full flex flex-row justify-evenly items-center flex-wrap gap-10 p-2">
          {courses.map((course) => (
            <EnrolledCourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default EnrolledCourses;
