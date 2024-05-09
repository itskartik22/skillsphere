import { useNavigate } from "react-router-dom";
import courseImg from "./../../../img/courseImg.png";

const EnrolledCoursesCard = ({ course }) => {
  const navigate = useNavigate();
  const navigateCoursePage = () => {
    navigate(`/course/${course._id}`);
  };
  return (
    <div
      onClick={navigateCoursePage}
      className="relative w-[300px] h-[250px] flex flex-col gap-2 shadow-md rounded-lg cursor-pointer"
    >
      <img
        src={course.image}
        // src={courseImg}
        alt="course-img"
        className="rounded-t-lg w-full h-2/3 object-cover"
      />
      <div className="px-3">
        <h1 className="course-name text-lg font-semibold justify-items-start">
          {course.title}
        </h1>
        <p className="">By {course.instructor?.instructorName}</p>
      </div>
    </div>
  );
};

export default EnrolledCoursesCard;
