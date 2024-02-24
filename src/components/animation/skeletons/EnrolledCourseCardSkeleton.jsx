const EnrolledCourseCardSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-2 shadow-md rounded-lg"
      style={{
        width: "300px",
        minHeight: "250px",
      }}
    >
      <div className="w-full h-40 rounded-t-lg bg-skeleton-dark animate-skeleton"></div>
      <div className="flex flex-col gap-2 px-2">
        <div className="course-name w-full h-6 bg-skeleton animate-skeleton justify-items-start"></div>
        <p className="w-1/2 h-6 bg-skeleton-lite animate-skeleton"></p>
      </div>
    </div>
  );
};

export default EnrolledCourseCardSkeleton;
