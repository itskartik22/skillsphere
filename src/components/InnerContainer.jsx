import { Outlet } from "react-router-dom";

const InnerContainer = () => {
  return (
    <div className="w-screen flex justify-center">
      <Outlet />
    </div>
  );
};

export default InnerContainer;
