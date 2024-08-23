import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useContext } from "react";
import { ChapterContext } from "../../../context/ChapterContext";


const CourseSidebarItem = ({ id, label, isCompleted, isLocked, chapter, handleChapterChange }) => {
  const activeChapter = useContext(ChapterContext);

  const isActive = activeChapter._id === id;
  console.log(activeChapter);

  const Icon = isLocked
    ? FaLock
    : isCompleted
    ? FaRegCheckCircle
    : FaRegPlayCircle;
  console.log(isActive, isLocked, isCompleted);
  return (
    <button
      className={`w-full flex items-center justify-start gap-2 text-base font-semibold px-4 py-3 border-b ${
        isLocked ? "hover:bg-white cursor-auto" : "hover:bg-slate-100"
      } ${isActive ? "bg-slate-100" : ""} ${
        isCompleted ? "text-emerald-700" : ""
      }`}
      onClick={
        () => handleChapterChange(chapter)
      }
      disabled={isLocked}
    >
      <Icon className={`${isLocked ? "opacity-90" : ""}`} />
      <span className={`${isLocked ? "opacity-50" : ""} text-left`}>{label}</span>
    </button>
  );
};

export default CourseSidebarItem;
