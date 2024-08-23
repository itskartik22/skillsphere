import { useEffect, useState } from "react";
import Carousel from "./HomeCarousel";
import baseURL from "../../../config/config";
import OurCourses from "./OurCourses";
import axios from "axios";

const Home = () => {
  const [topFiveCourses, setTopFiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //Courses imported
    axios({
      method: "get",
      url: `${baseURL}/api/v1/courses/top-5`,
    })
      .then((res) => {
        setTopFiveCourses(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="w-full flex flex-col gap-8 md:px-0 items-center">
      <Carousel loading={loading} courses={topFiveCourses} />
      <OurCourses />
    </div>
  );
};

export default Home;
