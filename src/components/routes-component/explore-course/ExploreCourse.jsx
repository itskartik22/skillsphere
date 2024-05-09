import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseImg from "./../../../img/courseImg.png";

import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import ReviewCard from "../../review/ReviewCard";

const ExploreCourse = ({ params }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/api/course/${courseId}`,
    })
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="w-screen flex flex-col gap-4">
      <div className="w-full md:min-h-[90vh] h-auto md:p-12 sm:p-6 xsm:p-3 p-2 flex md:flex-row flex-col-reverse md:gap-4 gap-2 justify-between items-center">
        <div className="md:w-1/2 w-full flex flex-col gap-4 items-start justify-start">
          <div className="flex flex-col gap-2">
            <span className="rounded-lg self-start lg:text-lg text-base font-medium bg-yellow-400 px-4 py-2 font-sans">
              BestSeller
            </span>
            <h1 className="lg:text-[2.65rem] lg:leading-tight md:text-4xl text-3xl font-bold ">
              Full Stack WebDevelopment
            </h1>
            <p className="lg:text-xl md:text-lg text-base font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              esse aut obcaecati in distinctio id, libero provident recusandae
              tempora amet nihil aliquam, vitae velit maxime, quo impedit error
              ullam aliquid reiciendis repellendus?
            </p>
            <p className="text-lg font-normal">
              By{" "}
              <span className="sm:text-xl text-lg text-gray-800 font-medium">
                Abhinav Roy
              </span>
            </p>
            <p className="text-xl text-yellow-600 flex items-center gap-1">
              <span>Rating:</span>
              <FaStar />
              <FaStar />
              <FaRegStarHalfStroke />
              <FaRegStar />
              <FaRegStar />
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="sm:text-[1.6rem] text-xl flex gap-1 items-baseline">
              <span>Price:</span>
              <span className="text-sm">(10% off)</span>
              <span className="font-medium">₹500 /-</span>
            </p>
            <div className="flex gap-3">
              <button className="bg-violet-600 hover:bg-violet-700 text-white sm:text-lg text-base md:px-10 px-6 py-2 rounded-md shadow-md">
                Enroll Now
              </button>
              <button className="flex gap-1 items-center text-black bg-gray-200 hover:bg-gray-300 sm:text-lg text-base md:px-10 px-6 py-2 rounded-md shadow-md">
                <span>Share</span> <CiShare2 />
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            // src={course.image || courseImg}
            src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210222183454/How-to-Become-a-Full-Stack-Web-Developer-in-2021.png"
            alt="course-img"
            className="lg:w-[80%] md:min-w-[350px] w-full rounded-md object-cover"
          />
        </div>
      </div>
      {/* Course Duration and Type */}
      <div className="relative sm:h-fit h-32 flex bg-violet-700 text-white sm:flex-row flex-col p-4 py-6 sm:justify-center items-center sm:gap-0 gap-20 text-lg font-medium">
        <div className="sm:static absolute top-3 sm:w-fit w-full">
          <span className="sm:h-full h-fit sm:w-fit w-1/2 text-center sm:border-r-[1px] sm:border-l-0 border-l-[1px] border-gray-600 md:px-8 py-3 sm:static absolute right-0">
            Masters Courses
          </span>
          <span className="sm:h-full h-fit sm:w-fit w-1/2 text-center sm:border-l-[1px] border-r-[1px] border-gray-600 md:px-8 px-4 py-3 sm:static absolute left-0">
            Recorded
          </span>
        </div>
        <div className="sm:static absolute top-1/2 sm:w-fit w-full">
          <span className="sm:h-full h-fit sm:w-fit w-1/2 text-center sm:border-r-[1px] border-l-[1px] border-gray-600 md:px-8 px-4 py-3 sm:static absolute right-0 top-0">
            60+ Hours
          </span>
          <span className="sm:h-full h-fit sm:w-fit w-1/2 text-center sm:border-l-[1px] sm:border-r-0 border-r-[1px] border-gray-600 md:px-6 px-4 py-3 sm:static absolute left-0 top-0 bottom-0">
            80+ Assignments
          </span>
        </div>
      </div>
      {/* Instructor Section */}
      <div className="w-full md:my-16 flex md:flex-row flex-col gap-6 md:items-center p-12">
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            src="https://st3.depositphotos.com/1177973/13520/i/450/depositphotos_135202692-stock-photo-businessman-standing-near-flip-chart.jpg"
            alt="course-img"
            className="w-[60%] md:min-w-[300px] min-w-[250px] rounded-md object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-2 md:items-start items-center md:justify-start">
          <h1 className="lg:text-3xl md:text-4xl text-3xl font-bold ">
            Abhinav Roy
          </h1>
          <p className="text-xl font-normal italic">
            Master's in Computer Science
          </p>
          <p className="lg:text-lg md:text-lg text-base font-normal md:text-start text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam esse
            aut obcaecati in distinctio id, libero provident recusandae tempora
            amet nihil aliquam, vitae velit maxime, quo impedit error ullam
            aliquid reiciendis repellendus?
          </p>
          <p className="italic text-lg">
            <span>4+Years </span>
            <span>of Experience</span>
          </p>
          <p className="text-lg text-yellow-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
            <FaRegStar />
            <FaRegStar />
          </p>
        </div>
      </div>
      <div className="bg-gray-800 md:p-10 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold p-4 border-l-8 border-violet-500 text-white">
          Course Reviews
        </h1>
        <div className="flex flex-col gap-6">
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default ExploreCourse;
