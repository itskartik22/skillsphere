import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfileView from "./NavProfileView";
import { FaCartShopping } from "react-icons/fa6";
// import { useState } from "react";

const Navbar = () => {
  // const [lightCart, setLightCart] = useState(true)
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="w-screen z-40 flex justify-between items-center py-2 md:px-10 sm:px-10 px-3 shadow-lg">
      <div className="logoSection text-xl">
        <Link to={"/"} className="text-violet-700 font-semibold">
          SkillSphere
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <ul className="hidden sm:flex items-center gap-5">
              <Link to={"user/enrolled-courses"}>MyCourses</Link>
              <Link to={"user/wishlist"}>Wishlists</Link>
              <Link to={"user/course-cart"} className="relative">
                <div
                  className={`absolute w-3 h-3 bg-red-600 rounded-full -right-1 -top-1 ${
                    true ? "" : "hidden"
                  }`}
                ></div>
                <FaCartShopping className="text-xl" />
              </Link>
            </ul>
            <NavProfileView />
            {/* Mobile Section */}
            {/* <ul className="">
              <Link to={"user/enrolled-courses"}>MyCourses</Link>
              <Link to={"wishlist"}>Wishlists</Link>
              <Link to={"user/course-cart"} className="relative">
                <div className={`absolute w-3 h-3 bg-red-600 rounded-full -right-1 -top-1 ${true ? "" : "hidden"}`}></div>
                <FaCartShopping className="text-xl" />
              </Link>
            </ul> */}
          </div>
        ) : (
          <>
            <button
              className="hidden md:inline-block text-base text-white bg-violet-500 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg md:px-4 sm:px-2 py-2.5 me-2 focus:outline-none"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="text-white bg-violet-500 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-base px-6 py-2.5"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
