import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ courses, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const latestCourse = courses.splice(5, courses.length - 5)
useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
})
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };
  if (loading) {
    return (
      <div className="carousel w-screen h-[300px]">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <div className="bg-blend-multiply absolute h-[800px] w-1/2 -translate-y-48 -translate-x-10 -rotate-12 bg-skeleton animate-skeleton"></div>
      <div className="carousel__info gap-2 absolute top-0 left-0 h-full flex flex-col w-1/2 justify-center pl-16 pr-12">
        {/* <h2 className="carousel__title text-3xl bg-gray-600 animate-skeleton w-[60px]"> </h2> */}
        <div className="line-skeleton w-4/5 h-10 rounded-sm bg-skeleton-dark animate-skeleton"></div>
        <div className="line-skeleton w-4/5 h-5 rounded-sm bg-skeleton-dark animate-skeleton"></div>
      </div>
      <div className="block w-full h-auto bg-skeleton animate-skeleton"></div>
      {/* <img
        src={courses[activeIndex].image}
        alt={`Slide ${activeIndex}`}
        className="carousel__img before:block before:absolute before:z-10 before:-inset-1 before:-skew-y-3 before:bg-pink-500"
      /> */}
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
    )
  }
  return (
    <div className="carousel cursor-pointer w-screen h-[300px]">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <div onClick={() => window.location.href = `/course/${courses[activeIndex]._id}`} className="bg-white/90 bg-blend-multiply absolute h-[800px] sm:w-1/2 w-2/3 -translate-y-48 -translate-x-10 -rotate-12"></div>
      <div onClick={() => window.location.href = `/course/${courses[activeIndex]._id}`} className="carousel__info absolute top-0 left-0 h-full flex flex-col w-1/2 justify-center sm:pl-16 xsm:pl-10 pl-4 sm:pr-12 pr-10">
        <h2 className="carousel__title sm:text-3xl text-2xl">{courses && courses[activeIndex]?.title}</h2>
        <p className="carousel__desc sm:text-base text-sm text-gray-600">By {courses && courses[activeIndex]?.instructor?.name}</p>
      </div>
      <img
        src={courses && courses[activeIndex]?.image}
        alt={`Slide ${activeIndex}`}
        className="carousel__img object-bottom"
        onClick={() => window.location.href = `/course/${courses[activeIndex]._id}`}
      />
      {/* <img
        src={courses[activeIndex].image}
        alt={`Slide ${activeIndex}`}
        className="carousel__img before:block before:absolute before:z-10 before:-inset-1 before:-skew-y-3 before:bg-pink-500"
      /> */}
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};
export default Carousel;
