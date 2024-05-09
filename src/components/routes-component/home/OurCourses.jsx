import axios from "axios";
import { CoursesCard } from "../..";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import baseURL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import CourseCardSkeleton from "../../animation/skeletons/CourseCardSkeleton";
import { AlertDispatchContext } from "../../../context/Context";
import Paginate from "../../pagination/Paginate";

const OurCourses = ({ courses, loading }) => {
  const { user } = useAuth();
  const disatchAlertHandler = useContext(AlertDispatchContext);
  const navigate = useNavigate();
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < courses.length / coursesPerPage) {
      setCurrentPage(currentPage + 1);
    }
  }
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

  return (
    <div className="md:w-3/4 w-full md:p-0 sm:px-10 px-5 flex justify-center flex-col">
      <h2 className="md:text-4xl text-3xl md:font-semibold font-medium">
        Courses
      </h2>
      <div className="w-full border-2 my-2"></div>
      {/* <div className="w-full flex flex-row justify-center items-center flex-wrap gap-5 p-2">
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
      </div> */}
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 place-content-center md:gap-8 gap-5 p-2">
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
          currentCourses?.map((course) => (
            <CoursesCard
              key={course._id}
              course={course}
              handleAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
      <Paginate
        coursesPerPage={coursesPerPage}
        totalCourses={courses.length}
        currentPage={currentPage}
        paginate={paginate}
        nextPage={nextPage}
      />
    </div>
  );
};

export default OurCourses;
