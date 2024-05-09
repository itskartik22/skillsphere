import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  
  return (
    <div className="">
      <h1>ChapterId{moduleId}</h1>
    </div>
  );
};

export default CoursePage;
