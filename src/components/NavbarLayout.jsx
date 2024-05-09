import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const NavbarLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default NavbarLayout;
