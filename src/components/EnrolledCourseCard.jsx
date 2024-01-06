import courseImg from "./../img/courseImg.png";

const EnrolledCoursesCard = ({ course }) => {
  // console.log(course);
  return (
    <div
      className="relative flex flex-col gap-2 shadow-md rounded-lg"
      style={{
        width: "300px",
        minHeight: "250px",
      }}
    >
      <img src={courseImg} alt="course-img" className="rounded-t-lg" />
      <div className="px-3">
        <h1 className="course-name text-lg font-semibold justify-items-start">
          {course.title}
        </h1>
        <p className="">By {course.instructor.instructorName}</p>
      </div>
    </div>
  );
};

export default EnrolledCoursesCard;
