import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const DashboardSidebar = () => {
  const { menuOpt } = useParams();
  const [activeDashboardMenu, setActiveDashboardMenu] = useState(menuOpt);
  useEffect(() => {
    setActiveDashboardMenu(menuOpt);
  }, [menuOpt]);

  const navbarHeight = "59.2px";
  return (
    <ul
      className="left-0 w-2/12 flex flex-col bg-violet-800 py-8"
      style={{
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      <Link
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          activeDashboardMenu === "home" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("Home")}
        to="/admin/dashboard/home"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Home</span>
      </Link>
      <Link
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          activeDashboardMenu === "users" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("User")}
        to="/admin/dashboard/users"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>User Management</span>
      </Link>
      <Link
        className={`w-full flex items-center gap-1 text-md  font-semibold ${
          activeDashboardMenu === "courses" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("Course")}
        to="/admin/dashboard/courses"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Courses Management</span>
      </Link>
      <Link
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          activeDashboardMenu === "setting" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("Setting")}
        to="/admin/dashboard/setting"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Setting & Configuration</span>
      </Link>
      <Link
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          activeDashboardMenu === "notifications" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("Notification")}
        to="/admin/dashboard/notifications"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Notifications</span>
      </Link>
      <Link
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          activeDashboardMenu === "security" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        // onClick={() => handleActiveMenuOption("Security")}
        to="/admin/dashboard/security"
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Security & Access</span>
      </Link>
    </ul>
  );
};

export default DashboardSidebar;
