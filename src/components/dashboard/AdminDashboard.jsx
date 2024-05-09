import { useState } from "react";
import { DashboardMain, DashboardSidebar } from "..";
import { useParams } from "react-router-dom";
const AdminDashboard = () => {
  const { menuOption } = useParams();
  console.log(menuOption)
  const [activeDashboardMenu, setActiveDashboardMenu] = useState(menuOption);

  // const handleActiveMenuOption = (state) => {
  //   setActiveDashboardMenu(state);
  // };
  return (
    <div className="w-full flex">
      {/* SideBar */}
      <DashboardSidebar
        activeDashboardMenu={activeDashboardMenu}
        // handleActiveMenuOption={handleActiveMenuOption}
      />

      {/* Main Section */}
      <DashboardMain activeDashboardMenu={activeDashboardMenu} />

      {/* Management Section
      <ContentManager activeDashboardMenu={activeDashboardMenu} /> */}
    </div>
  );
};
export default AdminDashboard;
