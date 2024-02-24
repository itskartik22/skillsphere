const CourseCardSkeleton = () => {
  return (
    <div
      className="relative flex flex-col gap-2 shadow-md rounded-lg"
      style={{
        width: "300px",
        height: "400px",
      }}
    >
      <div className="w-full h-40 bg-skeleton-dark animate-skeleton rounded-t-lg"></div>
      <div className="flex flex-col gap-2 px-3">
        <div className="w-full h-6 bg-skeleton animate-skeleton justify-items-start"></div>
        <p className="w-2/3 h-6 bg-skeleton-lite animate-skeleton justify-items-start"></p>
        <p className="w-3/4 h-6 bg-skeleton-lite animate-skeleton justify-items-start"></p>
        <p className="w-1/3 h-6 bg-skeleton-lite animate-skeleton justify-items-start"></p>
      </div>
      <div className="w-full flex flex-col absolute bottom-0">
        <div className="w-full flex">
          <div className="w-1/2 h-10 text-black bg-skeleton-lite animate-skeleton font-medium rounded-bl-lg text-base px-6 py-2.5 focus:outline-none"></div>
          <div className="w-1/2 h-10 bg-skeleton-dark animate-skeleton rounded-br-lg text-base px-2 py-2.5"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
