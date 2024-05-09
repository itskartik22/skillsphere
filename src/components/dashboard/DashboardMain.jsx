import { Home, Users, Courses, Notifications, Security, Setting } from "./main";

const DashboardMain = ({ activeDashboardMenu }) => {
  const navbarHeight = "59.2px";
  let content = "";
  if (activeDashboardMenu === "Home") content = <Home />;
  else if (activeDashboardMenu === "User") content = <Users />;
  else if (activeDashboardMenu === "Course") content = <Courses />;
  else if (activeDashboardMenu === "Notification") content = <Notifications />;
  else if (activeDashboardMenu === "Setting") content = <Setting />;
  else if (activeDashboardMenu === "Security") content = <Security />;
  else content = <Home />;
  return (
    <div
      className="w-10/12 flex flex-col py-4"
      style={{
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      {content}
    </div>
  );
};

export default DashboardMain;
