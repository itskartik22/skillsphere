import {Users, Courses, Notifications, Security, Setting} from './../components/dashboard/main'

const ContentManager = ({activeDashboardMenu}) => {
  const navbarHeight = "59.2px";
  let content = "";
  if (activeDashboardMenu === "Home") content = "Content-Manager";
  else if (activeDashboardMenu === "User") content = <Users />;
  else if (activeDashboardMenu === "Course") content = <Courses />;
  else if (activeDashboardMenu === "Notification") content = <Notifications />;
  else if (activeDashboardMenu === "Setting") content = <Setting />;
  else if (activeDashboardMenu === "Security") content = <Security />;
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
