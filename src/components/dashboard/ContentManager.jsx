import { UsersManagement, CoursesManagement, Notifications, Security, Setting } from "./main";

const ContentManager = ({ activeDashboardMenu }) => {
  const navbarHeight = "59.2px";
  let content = "";
  if (activeDashboardMenu === "home") content = "Content-Manager";
  else if (activeDashboardMenu === "users-management") content = <UsersManagement />;
  else if (activeDashboardMenu === "course-management") content = <CoursesManagement />;
  else if (activeDashboardMenu === "notification-management") content = <Notifications />;
  else if (activeDashboardMenu === "admin-setting") content = <Setting />;
  else if (activeDashboardMenu === "securtiy") content = <Security />;
  else content = "Content-Manager";
  return (
    <div
      className="left-0 w-4/12 flex flex-col bg-gray-200 py-8 px-4"
      style={{
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      {content}
    </div>
  );
};

export default ContentManager;
