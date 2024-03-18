import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  Setting,
  Profile,
  PageNotFound,
  PermissionDenied,
  AdminDashboard,
  EnrolledCourses,
  InnerContainer,
  CourseCart,
  Wishlist,
} from "./../components";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ResetPassword from "../components/routes-component/ResetPassword";
import ForgotPassword from "../components/routes-component/ForgotPassword";

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
            <Route path="user/wishlist" element={<Wishlist />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="denied" element={<PermissionDenied />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
