import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdDashboardCustomize } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { LuMenu } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { FaRegHeart, FaSignOutAlt } from "react-icons/fa";
import { LiaHandPointer } from "react-icons/lia";

const NavProfileView = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { user, logout } = useAuth();
  return (
    <>
      <div
        className="hidden sm:flex items-center gap-3 relative cursor-pointer"
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
          <>
            {" "}
            <div className="absolute z-10 sm:flex flex-col items-center w-40 top-10 -right-3 bg-violet-500 text-white shadow-lg rounded-md m-1 px-2 py-2 ">
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
          </>
        ) : (
          ""
        )}
      </div>
      {/* Mobile Section */}
      <div className="sm:hidden flex items-center gap-4 py-1" style={{}}>
        {" "}
        <Link to={"user/course-cart"} className="relative">
          <div
            className={`absolute w-3 h-3 bg-red-600 rounded-full -right-1 -top-1 ${
              true ? "" : "hidden"
            }`}
          ></div>
          {/* Mobile menu btn */}
          <FaCartShopping className="text-xl" />
        </Link>
        {/* <span className="text-base">{user?.userInfo.username}</span>  */}
        <LuMenu
          className="text-3xl"
          onClick={() => setIsDropdownVisible((state) => !state)}
        />
        {/* Mobile menu */}
        <div
          className={`fixed w-screen h-screen z-10 flex flex-col -top-2 ${
            isDropdownVisible ? "right-0" : "-right-full"
          } -r bg-violet-500 text-white text-lg shadow-lg sm:rounded-md px-2 py-2 transition-all`}
        >
          <RxCross2
            className="absolute top-5 right-4 text-3xl"
            onClick={() => setIsDropdownVisible((state) => !state)}
          />
          <div className="flex items-center px-1 py-2 gap-3 mt-2">
            <div className="border-2 border-white p-2 rounded-full">
              <FaUser className="text-3xl" />
            </div>
            <span className="text-lg font-medium">
              {user ? user.userInfo.username : "User"}
            </span>
          </div>
          <div className="h-1 w-full my-1 bg-gray-50"></div>
          <div className="w-full flex flex-col px-3 bg-violet-500 text-white">
            {user && user.userInfo.role === "admin" ? (
              <Link
                to={"admin/dashboard"}
                className="w-full flex items-center gap-2 p-1 my-1 border-solid hover:text-white hover:bg-violet-600"
                onClick={() => setIsDropdownVisible((state) => !state)}
              >
                <MdDashboardCustomize className="inline-block" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              ""
            )}
            <Link
              to={"user/enrolled-courses"}
              className="w-full flex items-center gap-2 p-1 my-1 border-solid hover:text-white hover:bg-violet-600"
              onClick={() => setIsDropdownVisible((state) => !state)}
            >
              <LiaHandPointer className="text-xl" />
              <span>Enrolled Courses</span>
            </Link>
            <Link
              to={"user/wishlist"}
              className="w-full flex items-center gap-2 p-1 my-1 border-solid hover:text-white hover:bg-violet-600"
              onClick={() => setIsDropdownVisible((state) => !state)}
            >
              <FaRegHeart />
              <span>Wishlist</span>
            </Link>
            <Link
              to={"user/profile"}
              className="w-full flex items-center gap-2 p-1 my-1 border-solid hover:text-white hover:bg-violet-600"
              onClick={() => setIsDropdownVisible((state) => !state)}
            >
              <CgProfile />
              <span>Profile</span>
            </Link>
            <Link
              to={"user/setting"}
              className="w-full flex items-center gap-2 p-1 my-1 border-solid hover:text-white hover:bg-violet-600"
              onClick={() => setIsDropdownVisible((state) => !state)}
            >
              <IoIosSettings />
              <span>Setting</span>
            </Link>
            <div className="h-1 w-full my-1 bg-gray-50"></div>
            <button
              onClick={() => {
                logout();
                setIsDropdownVisible((state) => !state);
              }}
              className="w-full flex items-center gap-2 p-1 my-1 hover:text-white hover:bg-violet-600"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default NavProfileView;
