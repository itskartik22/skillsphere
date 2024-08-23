import { useReducer } from "react";
import { DashboardMain, DashboardSidebar } from "..";
import {
  ActiveMenuContext,
  ActiveMenuDispatchContext,
} from "../../context/AdminMenuContext";
import adminMenuReducer from "../../reducer/adminMenuReducer";
const AdminDashboard = () => {
  return (
    <div className="w-full flex">
      {/* SideBar */}
      <DashboardSidebar />

      {/* Main Section */}
      <DashboardMain />
    </div>
  );
};
export default AdminDashboard;
