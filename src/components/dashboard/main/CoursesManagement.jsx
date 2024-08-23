import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../../config/config";
import CourseForm from "./CourseForm";

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [courseSearchQuery, setCourseSearchQuery] = useState("");
  const [courseFormVisiblity, setcourseFormVisiblity] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      url: `${baseURL}/api/v1/courses`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data);
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        setLoading(false);
      });
  }, []);

  const handleCourseFormVisiblity = () => {
    setcourseFormVisiblity(!courseFormVisiblity);
  };

  const handleCourseSearch = () => {
    axios({
      url: `${baseURL}/api/v1/courses/search?query=${courseSearchQuery}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  }

  console.log(courses);
  return (
    <div className="px-8 py-4">
      {courseFormVisiblity && (
        <CourseForm handleCourseFormVisiblity={handleCourseFormVisiblity} />
      )}
      <header className="w-full flex justify-between items-center gap-5 mb-4">
        <input
          type="text"
          placeholder="Filter Courses"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 flex-1"
          value={courseSearchQuery}
          onChange={(e) => setCourseSearchQuery(e.target.value)}
          onKeyUp={(e) => handleCourseSearch()}

        />
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
          onClick={() => handleCourseFormVisiblity()}
        >
          +Add Course
        </button>
      </header>
      <main>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="px-4 py-2">S.no</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Price(&#8377;)</th>
              <th className="px-4 py-2">Enrolled By</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          {loading ? (
            <div className="w-full absolute top-40 flex justify-center items-center h-full">
              <div className="w-20 h-20 border-t-2 border-b-2 border-violet-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <tbody>
              {courses?.map((course, index) => {
                return (
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2">{course.price}</td>
                    <td className="px-4 py-2">{course.enrolledBy.length}</td>
                    <td className="px-4 py-2">{course.rating}</td>
                    <td className="px-4 py-2">
                      {course.status === "active" ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {/* <Link
                        to={`/dashboard/users/${user._id}`}
                        className="bg-violet-500 text-white px-2 py-1 rounded-md hover:bg-violet-600 mr-2"
                      >
                        Details
                      </Link> */}
                      <button
                        className="bg-violet-500 text-white px-2 py-1 rounded-md hover:bg-violet-600 mr-2"
                        onClick={() =>
                          navigate(
                            `/admin/dashboard/course-editor/${course._id}`
                          )
                        }
                        // onClick={() => handleUserDetailsView(true, user._id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </main>
    </div>
  );
};

export default CoursesManagement;
