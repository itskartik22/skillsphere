import { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ActiveMenuContext, ActiveMenuDispatchContext } from "../../context/AdminMenuContext";

const DashboardSidebar = () => {
  const menuOption = useContext(ActiveMenuContext);
  const dispatch = useContext(ActiveMenuDispatchContext);

  // const navbarHeight = "59.2px";
  return (
    <ul
      className="sticky left-0 top-0 w-2/12 flex flex-col bg-violet-800 py-8"
    >
      <li
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          menuOption === "home" ? "bg-white text-black" : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "home",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Home</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          menuOption === "users-management"
            ? "bg-white text-black"
            : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "users-management",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>User Management</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md  font-semibold ${
          menuOption === "courses-management"
            ? "bg-white text-black"
            : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "courses-management",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Courses Management</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          menuOption === "setting"
            ? "bg-white text-black"
            : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "setting",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Setting & Configuration</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          menuOption === "notifications"
            ? "bg-white text-black"
            : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "notifications",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Notifications</span>
      </li>
      <li
        className={`w-full flex items-center gap-1 text-md font-semibold ${
          menuOption === "security"
            ? "bg-white text-black"
            : "text-white"
        } hover:bg-white hover:text-black p-2 my-1 cursor-pointer`}
        onClick={() =>
          dispatch({
            type: "security",
          })
        }
      >
        <IoIosArrowForward className="inline align-middle" />
        <span>Security & Access</span>
      </li>
    </ul>
  );
};

export default DashboardSidebar;
