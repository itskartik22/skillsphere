import { Outlet } from "react-router-dom";

const InnerContainer = () => {
  return (
    <div className="w-screen flex flex-col items-center overflow-hidden">
      <Outlet />
    </div>
  );
};

export default InnerContainer;
