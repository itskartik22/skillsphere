import { useContext, useState, useTransition } from "react";
import FileUpload from "./FileUpload";
import { VscChromeClose } from "react-icons/vsc";
import baseURL from "../../../config/config";
import axios from "axios";

import { IoReload } from "react-icons/io5";
import AddCourseModule from "./AddCourseModule";
import { AlertDispatchContext } from "../../../context/Context";

const CourseForm = ({ handleCourseFormVisiblity }) => {
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [courseCoverImage, setCourseCoverImage] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [instructorQuery, setInstructorQuery] = useState("");
  const [section, setSection] = useState("course");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    rating: "",
    status: false,
    instructorId: "",
  });
  const [courseId, setCourseId] = useState(null);
  const dispatchAlertHandler = useContext(AlertDispatchContext);

  const [isPending, startTransition] = useTransition();

  const handleCourseThumbnail = (file) => {
    setCourseThumbnail(file);
  };
  // const handleCourseCoverImage = (file) => {
  //   setCourseCoverImage(file);
  // };

  const fetchInstructors = () => {
    axios({
      url: `${baseURL}/api/v1/instructors/search?query=${instructorQuery}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setInstructors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateCourseSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", courseThumbnail);
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("category", formData.category);
    formdata.append("price", formData.price);
    formdata.append("rating", formData.rating);
    formdata.append("status", formData.status);
    formdata.append("instructorId", formData.instructorId);
    console.log(formdata);

    startTransition(() => {
      axios({
        url: `${baseURL}/api/v1/courses`,
        method: "POST",
        data: formdata,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setCourseId(res.data.course._id);
          dispatchAlertHandler({
            type: "success",
            message: res.data.message,
          });
          setSection("chapters");
        })
        .catch((err) => {
          dispatchAlertHandler({
            type: "error",
            message: err.response.data.message,
          });
          console.log(err);
        });
    });
  };

  const handleCourseInfoUpdate = (e) => {
    e.preventDefault();
    formData.append("thumbnail", courseThumbnail);
    startTransition(() => {
      axios({
        url: `${baseURL}/api/v1/courses/update/${courseId}`,
        method: "PATCH",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setCourseId(res.data.courseId);
          dispatchAlertHandler({
            type: "success",
            message: "Course Added Successfully",
          });
          setSection("chapters");
        })
        .catch((err) => {
          dispatchAlertHandler({
            type: "error",
            message: err.response.data.message,
          });
          console.log(err);
        });
    });
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 z-10 bg-black/70 p-8 overflow-y-scroll">
      <div className="relative w-1/2 m-auto top-0 bg-white p-6 rounded-md flex flex-col gap-3">
        <header className="w-full flex justify-center items-center gap-5 mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Add Course</h2>
        </header>
        <div className="w-fit flex flex-row gap-3 border-2 border-violet-500 bg-violet-500 rounded-lg">
          <button
            className={`${
              section === "course" ? "bg-white text-violet-500" : "text-white"
            } px-4 py-2 rounded-lg font-medium transition-colors`}
            onClick={() => setSection("course")}
          >
            <span>Course Details</span>
          </button>
          <button
            className={`${
              section === "chapters" ? "bg-white text-violet-500" : "text-white"
            } px-4 py-2 rounded-lg font-medium transition-colors`}
            onClick={() => setSection("chapters")}
          >
            <span>Chapters</span>
          </button>
        </div>
        {section === "course" && (
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleCreateCourseSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-gray-600">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-600">
                {" "}
                Description{" "}
              </label>
              <textarea
                id="description"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={isPending}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-600">
                {" "}
                Category{" "}
              </label>
              <input
                id="description"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                disabled={isPending}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="price" className="text-gray-600">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    disabled={isPending}
                  />
                </div>
                <div className="w-fit flex flex-col gap-2">
                  <label htmlFor="status" className="text-gray-600">
                    Status
                  </label>
                  {/* <select
                    id="status"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    disabled={isPending}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select> */}
                  <div className="flex items-center gap-2">
                    <button
                      className={`w-16 bg-white shadow-md border-2 py-1 px-1 rounded-2xl flex ${
                        formData.status ? "" : "justify-end"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, status: !formData.status });
                      }}
                    >
                      <div
                        className={`h-6 w-6 ${
                          formData.status ? "bg-green-800" : "bg-red-800"
                        } rounded-full`}
                      ></div>
                    </button>
                    <span>{formData.status ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="rating" className="text-gray-600">
                    Thumbnail
                  </label>
                  <FileUpload handleFileState={handleCourseThumbnail} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-600">
                Instructor Id (Instructor Name)
              </label>
              <input
                type="text"
                id="instructor"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={instructorQuery}
                onKeyUp={fetchInstructors}
                onChange={(e) => {
                  setInstructorQuery(e.target.value)
                }}
                disabled={isPending}
              />
              <div className="flex flex-col border-2 rounded-md gap-2">
                {instructors.map((instructor) => {
                  return (
                    <div
                      key={instructor._id}
                      className="flex flex-row gap-2 items-center"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          instructorId: instructor._id,
                        });
                        setInstructorQuery(instructor.name);
                        setInstructors([]);
                      }}
                    >
                      <span>{instructor._id}</span>
                      <span>{instructor.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-600">
                Instructor Bio
              </label>
              <input
                type="text"
                id="instructor"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.instructorBio}
                onChange={(e) =>
                  setFormData({ ...formData, instructorBio: e.target.value })
                }
                disabled={isPending}
              />
            </div> */}
            {/* <div className="flex flex-row gap-4 justify-around">
              <div className="flex flex-col gap-2">
                <label htmlFor="rating" className="text-gray-600">
                  Cover Image
                </label>
                <FileUpload handleFileState={handleCourseCoverImage} />
              </div>
            </div> */}

            {!courseId && (
              <button
                type="submit"
                className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600 mt-2"
                disabled={isPending}
              >
                Add Course
              </button>
            )}
            {courseId && (
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mt-2"
                onClick={handleCourseInfoUpdate}
                disabled={isPending}
              >
                Update Info
              </button>
            )}
          </form>
        )}
        {section === "chapters" && <AddCourseModule courseId={courseId} />}
        <button
          className="absolute top-5 right-5 text-white px-4 py-2 rounded-md"
          onClick={() => handleCourseFormVisiblity()}
        >
          <VscChromeClose className="text-black text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
