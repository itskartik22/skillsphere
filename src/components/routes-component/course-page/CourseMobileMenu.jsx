import CourseSidebarItem from "./CourseSidebarItem";

const CourseMobileMenu = ({ course, enrolledStatus, handleChapterChange }) => {
  const chapters = course.chapters;
  return (
    <div className="flex-col pt-[70px]">
      {chapters?.map((chapter) => {
        return (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.name}
            isCompleted={false}
            chapter={chapter}
            handleChapterChange={handleChapterChange}
            isLocked={enrolledStatus === false ? true : false}
          />
        );
      })}
    </div>
  );
};

export default CourseMobileMenu;
