import { IoIosArrowForward } from "react-icons/io";

const DashboardSidebar = ({activeDashboardMenu, handleActiveMenuOption}) => {

  const navbarHeight = "59.2px";
  return (
    <ul
      className="left-0 w-2/12 flex flex-col bg-violet-800 py-8 px-4"
      style={{
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "Home" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("Home")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Home</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "User" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("User")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>User Management</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "Course" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("Course")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Courses Management</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "Setting" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("Setting")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Setting & Configuration</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "Notification" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("Notification")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Notifications</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md text-white font-semibold ${
          activeDashboardMenu === "Security" ? "bg-violet-700" : ""
        } hover:bg-violet-700 p-2 my-1 cursor-pointer`}
        onClick={() => handleActiveMenuOption("Security")}
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Security & Access</span>
      </li>
    </ul>
  );
};

export default DashboardSidebar;
