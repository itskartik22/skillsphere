import CourseSidebarItem from "./CourseSidebarItem";
import { FaBook } from "react-icons/fa";

const CourseSidebar = ({ course, enrolledStatus }) => {
  const chapters = course.chapters;
  return (
    <div className="w-80 flex-col fixed left-0 inset-y-0 bg-white shadow-lg z-5">
      <div className="relative flex flex-col border-b-2 px-4 py-4">
        <h1 className="text-lg font-medium">
          {/* <FaBook className="mr-2 inline" /> */}
          {course.title}
        </h1>
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

export default CourseSidebar;
