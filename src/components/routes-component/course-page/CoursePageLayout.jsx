import { Outlet, useNavigate, useParams } from "react-router-dom";
import CourseSidebar from "./CourseSidebar";
import CourseNavbar from "./CourseNavbar";
import CourseMobileMenu from "./CourseMobileMenu";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import baseURL from "../../../config/config";
import { useAuth } from "../../../hooks/useAuth";

const CoursePageLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [course, setCourse] = useState({});
  const [enrolledStatus, setEnrolledStatus] = useState(false);
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/login");
  }
  useEffect(() => {
    if (!moduleId) {
      navigate(`/course/${courseId}/module/1`);
    }
  });
  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseURL}/api/v1/courses/${courseId}`,
      // headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
      .then((res) => {
        setCourse(res.data.course);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      method: "GET",
      url: `${baseURL}/api/v1/courses/enroll/${courseId}`,
      withCredentials: true,
    })
      .then((res) => {
        setEnrolledStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  const viewMobileMenu = () => {
    setMenuVisible((state) => !state);
  };

  return (
    <div className="w-full h-full flex flex-row">
      <div className="h-[70px] md:pl-80 fixed inset-y-0 w-full z-100">
        <CourseNavbar courseId={courseId} />
      </div>
      <div className="hidden md:flex">
        <CourseSidebar course={course} enrolledStatus={enrolledStatus} />
      </div>
      <div
        className={`md:hidden w-80 flex bg-white absolute ${
          menuVisible ? "left-0" : "-left-80"
        } inset-y-0 top-2 shadow-lg z-20 transition-all`}
      >
        <div
          className={`md:hidden flex flex-row absolute items-center bg-white text-violet-500 border-2 z-30 rounded-full w-16 h-12 py-2 px-1 -right-8 top-1/2 cursor-pointer
        ${menuVisible ? "rotate-180 justify-start" : "rotate-0 justify-end"}`}
          onClick={viewMobileMenu}
        >
          <FaAngleRight className="text-2xl" />
        </div>
        <CourseMobileMenu
          course={course}
          enrolledStatus={enrolledStatus}
          // menuVisible={menuVisible}
          // hideMobileMenu={hideMobileMenu}
        />
      </div>
      <main className="md:pl-80 py-[70px] w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default CoursePageLayout;
