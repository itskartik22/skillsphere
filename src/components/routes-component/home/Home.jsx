import { useEffect, useState } from "react";
import Carousel from "./HomeCarousel";
import baseURL from "../../../config/config";
import OurCourses from "./OurCourses";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //Courses imported
    axios({
      method: "get",
      url: `${baseURL}/api/v1/courses`,
    })
      .then((res) => {
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [courses.length]);
  return (
    <div className="w-full flex flex-col gap-8 md:px-0 items-center">
      <Carousel loading={loading} courses={courses} />
      <OurCourses loading={loading} courses={courses} />
    </div>
  );
};

export default Home;
