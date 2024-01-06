import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  Setting,
  Profile,
  PageNotFound,
  AdminDashboard,
  EnrolledCourses,
  InnerContainer,
  CourseCart
} from "./../components";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import PermissionDenied from "../components/PermissionDenied";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<InnerContainer />}>
          {/* Protected Routes for Admin Access */}
          <Route element={<ProtectedRoute roleRequired={"admin"} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/createItem" element={<Setting />} />
          </Route>
          {/* Protected Route for User Access */}
          <Route element={<ProtectedRoute />}>
            <Route path="user/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/setting" element={<Setting />} />
            <Route path="user/course-cart" element={<CourseCart />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="denied" element={<PermissionDenied />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
