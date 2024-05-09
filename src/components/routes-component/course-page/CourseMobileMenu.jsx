import CourseSidebarItem from "./CourseSidebarItem";
import { FaBook } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

const CourseMobileMenu = ({ course, enrolledStatus }) => {
  const chapters = course.chapters;
  return (
    <div className={`flex-col`}>
      {/* <div className="absolute bg-yellow-500 z-10 rounded-full py-2 px-4 -right-8 top-1/2 cursor-pointer">
        <FaAngleRight className="text-2xl" />
      </div> */}
      <div className="relative flex flex-col border-b-2 px-4 py-4">
        <h1 className="text-lg font-medium">
          {/* <FaBook className="mr-2 inline" /> */}
          {course.title}
        </h1>
        {/* <MdClose
          className="absolute right-5 top-6 text-3xl cursor- border-2 rounded-full"
          onClick={() => hideMobileMenu()}
        /> */}
        {/* <p className="text-sm text-gray-500">Course Description</p> */}
      </div>
      {chapters?.map((chapter) => {
        return (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.name}
            isCompleted={false}
            courseId={course.id}
            isLocked={enrolledStatus === false ? true : false}
          />
        );
      })}
    </div>
  );
};

export default CourseMobileMenu;
