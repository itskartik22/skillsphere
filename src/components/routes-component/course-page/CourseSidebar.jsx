import CourseSidebarItem from "./CourseSidebarItem";
import { FaBook } from "react-icons/fa";

const CourseSidebar = ({ course, enrolledStatus, handleChapterChange }) => {
  const chapters = course.chapters;
  return (
    <div className="w-80 flex-col fixed top-0 bottom-0 h-screen pt-[70px] bg-white shadow-lg z-5">
      {chapters?.map((chapter) => {
        return (
          <CourseSidebarItem
            key={chapter._id}
            id={chapter._id}
            label={chapter.name || chapter.title}
            isCompleted={false}
            chapter={chapter}
            isLocked={enrolledStatus === false ? true : false}
            handleChapterChange={handleChapterChange}
          />
        );
      })}
    </div>
  );
};

export default CourseSidebar;
