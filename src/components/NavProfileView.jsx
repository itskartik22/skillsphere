import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdDashboardCustomize } from "react-icons/md";

export const NavProfileView = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { user, logout } = useAuth();
  return (
    <div
      className="flex items-center gap-3 relative cursor-pointer"
      onMouseEnter={() => setIsDropdownVisible((state) => !state)}
      onMouseLeave={() => setIsDropdownVisible((state) => !state)}
    >
      <span className="text-base font-medium">
        {" "}
        {user ? user.userInfo.username : "User"}
      </span>
      <div className="border-2 border-violet-500 p-2 rounded-full">
        <FaUser className="text-2xl" />
      </div>
      {isDropdownVisible ? (
        <div className="absolute flex flex-col items-center w-40 top-10 -right-3 bg-violet-500 text-white shadow-lg rounded-md m-1 px-2 py-2 ">
          {user && user.userInfo.role === "admin" ? (
            <Link
              to={"admin/dashboard"}
              className="w-full flex items-center justify-center gap-1 p-1 border-solid hover:text-white hover:bg-violet-400"
            >
              <MdDashboardCustomize className="inline-block" />
              <span>Dashboard</span>
            </Link>
          ) : (
            ""
          )}
          <Link
            to={"user/profile"}
            className="w-full flex items-center justify-center gap-1 p-1 border-solid hover:text-white hover:bg-violet-600"
          >
            <span>Profile</span>
          </Link>
          <Link
            to={"user/setting"}
            className="w-full flex items-center justify-center gap-1 p-1 border-solid hover:text-white hover:bg-violet-600"
          >
            <span>Setting</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-1 p-1 mt-2 border-solid border-t-2 hover:text-white hover:bg-violet-600"
          >
            <CiLogout className="inline-block" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
