import { useState } from "react";
import { ContentManager, DashboardMain, DashboardSidebar } from "..";
const AdminDashboard = () => {
  const [activeDashboardMenu, setActiveDashboardMenu] = useState("Home");

  const handleActiveMenuOption = (state) => {
    setActiveDashboardMenu(state);
  };
  return (
    <div className="w-full flex">
      {/* SideBar */}
      <DashboardSidebar
        activeDashboardMenu={activeDashboardMenu}
        handleActiveMenuOption={handleActiveMenuOption}
      />

      {/* Main Section */}
      <DashboardMain activeDashboardMenu={activeDashboardMenu} />

      {/* Management Section */}
      <ContentManager activeDashboardMenu={activeDashboardMenu} />
    </div>
  );
};
export default AdminDashboard;
