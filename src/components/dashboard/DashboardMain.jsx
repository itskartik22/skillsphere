import { useContext } from "react";
import { ActiveMenuContext } from "../../context/AdminMenuContext";
import { Home, UsersManagement, CoursesManagement, Notifications, Security, Setting } from "./main";

const DashboardMain = () => {

  const menuOption = useContext(ActiveMenuContext);
  const navbarHeight = "59.2px";
  let content = "";
  if (menuOption === "home") content = <Home />;
  else if (menuOption === "users-management") content = <UsersManagement />;
  else if (menuOption === "courses-management") content = <CoursesManagement />;
  else if (menuOption === "notifications") content = <Notifications />;
  else if (menuOption === "settings") content = <Setting />;
  else if (menuOption === "security") content = <Security />;
  return (
    <div
      className="w-10/12 flex flex-col"
      style={{
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      {content}
    </div>
  );
};

export default DashboardMain;
