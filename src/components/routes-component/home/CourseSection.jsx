import CoursesCard from "./CourseCard";

const CourseSection = ({sectionTitle}) => {
    return (
        <div>
            <h1>{sectionTitle}</h1>
            <div className="w-full border-2 my-2"></div>
            <div className="w-full flex flex-row justify-center items-center gap-10 p-2">
                <CoursesCard />
            </div>
        </div>
    );
}

export default CourseSection;