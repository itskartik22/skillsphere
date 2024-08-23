import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  Setting,
  Profile,
  PageNotFound,
  PermissionDenied,
  EnrolledCourses,
  CourseCart,
  Wishlist,
  AdminDashboard,
  NavbarLayout,
} from "./../components";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ResetPassword from "../components/routes-component/ResetPassword";
import ForgotPassword from "../components/routes-component/ForgotPassword";
import ExploreCourse from "../components/routes-component/explore-course/ExploreCourse";
import CoursePage from "../components/routes-component/course-page/CoursePage";
import CoursePageLayout from "../components/routes-component/course-page/CoursePageLayout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route>
          {/* Protected Routes for Admin Access */}
          <Route element={<ProtectedRoute roleRequired={"admin"} />}>
            <Route element={<NavbarLayout />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              {/* <Route element={<CourseEditorLayout />}>
                <Route
                  path="/admin/dashboard/course-editor/:courseId"
                  element={<CourseEditor />}
                />
              </Route> */}

              <Route path="/admin/createItem" element={<Setting />} />
            </Route>
          </Route>
          {/* Protected Route for User Access */}
          <Route element={<ProtectedRoute />}>
            <Route element={<NavbarLayout />}>
              <Route
                path="/user/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/setting" element={<Setting />} />
              <Route path="/user/course-cart" element={<CourseCart />} />
              <Route path="/user/wishlist" element={<Wishlist />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* <Route path="/explore-course/:courseId" element={<ExploreCourse />} /> */}
            <Route element={<CoursePageLayout />}>
              <Route path="/course/:courseId" element={<CoursePage />} />
              {/* <Route
                path="/course/:courseId/module/:moduleId"
                element={<CoursePage />}
              /> */}
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/denied" element={<PermissionDenied />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
