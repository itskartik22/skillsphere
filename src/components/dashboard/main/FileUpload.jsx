import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUpload = ({ handleFileState }) => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileState(file);
    setSelectedFileName(file.name);
  };

  return (
    <div className="parent p-4 bg-white rounded-md shadow-md">
      <div className="file-upload relative flex flex-col items-center gap-1 p-1 cursor-pointer text-center">
        <FaCloudUploadAlt className="text-2xl" />
        <h3>{selectedFileName || "Click box to upload"}</h3>
        <p className="text-sm">Max file size: 1MB</p>
        <input
          type="file"
          className="absolute block h-full w-full top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
