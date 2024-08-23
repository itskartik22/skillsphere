import { IoReload } from "react-icons/io5";
import FileUpload from "./FileUpload";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import baseURL from "../../../config/config";

const AddCourseModule = ({ courseId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [modules, setModules] = useState([]);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log(courseId);

  useEffect(() => {
    if (courseId) {
      axios({
        url: `${baseURL}/api/v1/courses/module/${courseId}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setModules(res.data.modules);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [courseId]);

  const handleModulesReload = () => {
    if (courseId) {
      axios({
        url: `${baseURL}/api/v1/courses/module/${courseId}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setModules(res.data.modules);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileState = (file) => {
    setFile(file);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    if (!courseId) {
      setErrorMessage("Course Id is required!");
      return;
    }
    setLoading(true);
    // console.log(file);
    // console.log("Initiating file upload");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("courseId", courseId);
    console.log(formData);
    startTransition(() => {
      axios({
        url: `${baseURL}/api/v1/courses/module/upload`,
        method: "POST",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setSuccessMessage("Video Uploaded Successfully");
          setLoading(false);
          setModule({ ...module, videoUrl: res.data.videoUrl });
          alert("Video Uploaded Successfully");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Something went wrong");
        });
    });
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!module.title || !module.description) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (!courseId) {
      setErrorMessage("Course is not created yet!");
      return;
    }

    const formData = {
      title: module.title,
      description: module.description,
      videoUrl: module.videoUrl,
      courseId,
    };

    startTransition(() => {
      axios({
        url: `${baseURL}/api/v1/courses/module`,
        method: "POST",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setModules([...modules, res.data.module]);
          setModule({
            title: "",
            description: "",
            videoUrl: "",
          });
          setFile(null);
          setSuccessMessage("Module Added Successfully");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-gray-700">Add Chapter</h2>
      <form className="flex flex-col gap-4" onSubmit={handleAddModule}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-600">
            Chapter Title
          </label>
          <input
            type="text"
            id="title"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={module.title}
            onChange={(e) => setModule({ ...module, title: e.target.value })}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-600">
            Chapter Description
          </label>
          <textarea
            id="description"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
            disabled={isPending}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-600">
            Chapter Video
          </label>
          <div className="flex items-end gap-4">
            <FileUpload handleFileState={handleFileState} />
            <button
              className="px-3 py-2 rounded-md bg-violet-500 text-white"
              onClick={handleFileUpload}
              disabled={loading}
              // disabled={true}
            >
              <span>Upload Video</span>
            </button>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2">
          <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            // width="640"
            // height="264"
            poster="MY_VIDEO_POSTER.jpg"
            data-setup="{}"
          >
            <source
              src=""
              // type="application/x-mpegURL"
            />
          </video>
        </div> */}
        {errorMessage && (
          <div className="text-red-500 text-sm font-semibold">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm font-semibold">
            {successMessage}
          </div>
        )}
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddModule}
          disabled={isPending}
        >
          Add Chapter
        </button>
      </form>
      <div className="flex justify-between items-center py-2">
        <h2 className="text-lg font-semibold text-gray-700">Chapters List</h2>
        <button className="p-2 rounded-full hover:rotate-180 transition-transform" onClick={handleModulesReload}>
          <IoReload className="text-xl font-semibold" />
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ul>
          {modules.length === 0 && (
            <li>
              <h3 className="text-base font-semibold text-gray-700">
                No Chapters Added Yet
              </h3>
            </li>
          )}
          {modules.length > 0 &&
            modules.map((module, index) => (
              <li key={index} className="border-2 border-gray-500 p-2">
                <div className="flex flex-row gap-2">
                  <span className="text-gray-700 font-semibold">
                    Ch.{index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-gray-700">
                    {module.title}
                  </h3>
                  {/* <p className="text-gray-600">{module.description}</p> */}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCourseModule;
