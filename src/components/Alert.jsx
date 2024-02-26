import { FiAlertCircle } from "react-icons/fi";

const Alert = ({ status, type, message }) => {
  if (type === "success") {
    return (
      <div className="md:w-80 w-60 absolute z-50 top-5 right-0 bg-green-900 text-white rounded-md px-4 py-2 flex items-center gap-1">
        <FiAlertCircle className="text-lg" />
        {message}
      </div>
    );
  } else if (type === "warning") {
    return (
      <div className="md:w-80 w-60 absolute z-50 top-5 right-0 bg-yellow-900 text-white rounded-md px-4 py-2 flex items-center gap-1">
        <FiAlertCircle className="text-lg" />
        {message}
      </div>
    );
  } else if (type === "alert") {
    return (
      <div className="md:w-80 w-60 absolute z-50 top-5 right-0 bg-sky-900 text-white rounded-md px-4 py-2 flex items-center gap-1">
        <FiAlertCircle className="text-lg" />
        {message}
      </div>
    );
  }
  return (
    <div
      className={`md:w-80 w-60 absolute z-50 top-5 right-0 bg-red-900 text-white rounded-md px-4 py-2 flex items-center gap-1`}
    >
      <FiAlertCircle className="text-lg" />
      {message}
    </div>
  );
};
export default Alert;
