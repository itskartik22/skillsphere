import axios from "axios";
import { EnrolledCourseCard, Loader } from "../..";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import EnrolledCourseCardSkeleton from "../../animation/skeletons/EnrolledCourseCardSkeleton";
import { AlertDispatchContext } from "../../../context/Context";

const EnrolledCourses = () => {
  const { user, sessionExpiredLogout } = useAuth();
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = user.token;
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/api/v1/users/enrolled-courses`,
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setCourses(res.data.data.coursesEnrolled);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message)
        // if (err.response.request.status === 401) {
        //   dispatchAlertHandler({
        //     type: "error",
        //     message: "Session Expired",
        //   });
        //   sessionExpiredLogout();
        // } else {
        //   dispatchAlertHandler({
        //     type: "error",
        //     message: "Something went wrong",
        //   });
        // }
        setLoading(false);
      });
  }, [courses.length, token]);

  // if (courses && courses.length === 0) {
  //   return (
  //     <div className="md:w-3/4 w-full py-8 md:px-0 sm:px-10 px-4  justify-items-center">
  //       <div className="w-full flex justify-center flex-col">
  //         <h2 className="md:text-4xl sm:text-3xl text-2xl md:font-semibold font-medium">
  //           Enrolled Courses
  //         </h2>
  //         <div className="w-full border-2 my-2"></div>
  //         <div className="w-full text-lg">No Courses Enrolled</div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="md:w-3/4 min-h-screen w-full py-8 md:px-0 sm:px-10 px-4  justify-items-center">
      <div className="w-full flex justify-center flex-col">
        <h2 className="md:text-4xl sm:text-3xl text-2xl md:font-semibold font-medium">
          Enrolled Courses
        </h2>
        <div className="w-full border-2 my-2"></div>
        <div className="w-full flex flex-row justify-evenly items-center flex-wrap gap-10 p-2">
          {loading ? (
            <>
              <EnrolledCourseCardSkeleton />
              <EnrolledCourseCardSkeleton />
              <EnrolledCourseCardSkeleton />
              <EnrolledCourseCardSkeleton />
              <EnrolledCourseCardSkeleton />
              <EnrolledCourseCardSkeleton />
            </>
          ) : courses.length === 0 ? (
            "No Courses Enrolled"
          ) : (
            courses?.map((course) => (
              <EnrolledCourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default EnrolledCourses;
