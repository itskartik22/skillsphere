import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import NavProfileMenu from "./NavProfileMenu";
import { useState } from "react";
import CourseMobileMenu from "./CourseMobileMenu";

const CourseNavbar = ({ course, progressCount }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const onClickExit = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-between px-4 bg-white border-b border-gray-200">
      <div className="flex gap-2">
        <button
          className="flex items-center space-x-4 gap-2 cursor-pointer font-medium"
          onClick={onClickExit}
        >
          Exit
          <IoMdExit className="text-2xl" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-sm text-white bg-violet-500 rounded-md">
          Enroll Now
        </button>
        <NavProfileMenu />
      </div>
    </div>
  );
};

export default CourseNavbar;
