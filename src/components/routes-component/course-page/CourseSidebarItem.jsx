import { useNavigate, useParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


const CourseSidebarItem = ({ id, label, isCompleted, isLocked }) => {
  const navigate = useNavigate();
  const {courseId, moduleId} = useParams();
  if(id === 1){
    isLocked = false;
  }
  console.log(id, moduleId, courseId);
  // eslint-disable-next-line eqeqeq
  const isActive = moduleId == id;

  const onClick = () => {
    if (!isLocked) {
      navigate(`/course/${courseId}/module/${id}`);
    }
  };

  const Icon = isLocked
    ? FaLock
    : isCompleted
    ? FaRegCheckCircle
    : FaRegPlayCircle;

  return (
    <button
      className={`w-full flex items-center justify-start gap-2 text-base font-semibold px-4 py-3 border-b ${
        isLocked ? "hover:bg-white cursor-auto" : "hover:bg-slate-100"
      } ${isActive ? "bg-slate-100" : ""} ${
        isCompleted ? "text-emerald-700" : ""
      }`}
      onClick={onClick}
    >
      <Icon className={`${isLocked ? "opacity-90" : ""}`} />
      <span className={`${isLocked ? "opacity-50" : ""} text-left`}>{label}</span>
    </button>
  );
};

export default CourseSidebarItem;
