import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AlertContext, AlertDispatchContext } from "../../context/Context";
import loginImg from "./../../img/login.jpg";

const Login = () => {
  const alert = useContext(AlertContext);
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatchAlertHandler({
        type: "success",
        message: "You are logged in!",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (alert.status) {
      setTimeout(
        () =>
          dispatchAlertHandler({
            type: "remove",
          }),
        3000
      );
    }
  }, [user, alert, navigate]);

  const userLogin = async () => {
    if (userEmail !== "" && userPassword !== "") {
      await login({ userEmail, userPassword });
    } else {
      // setAlert({
      //   status: true,
      //   message: "Input field empty!",
      //   type: "error",
      // });
      dispatchAlertHandler({
        type: "error",
        message: "Input field empty!",
      });
    }
    setUserEmail("");
    setUserPassword("");
  };
  return (
        <div className="flex lg:flex-row flex-col gap-5 items-center mx-auto md:h-screen sm:p-10 py-10 px-3">
      <div className="lg:w-1/2 md:2/3 flex flex-col items-center justify-center">
        <div className="">
          <h1 className="gap-2 lg:text-5xl sm:text-4xl xsm:text-3xl text-2xl sm:font-semibold font-medium text-center">
          Welcome to&nbsp;
          <span>
            <Link
              to={"/"}
              className="text-violet-900"
            >
              {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite     */}
               SkillSphere
            </Link>

          </span>
          </h1>
        </div>
        <img src={loginImg} alt="" className="lg:block hidden w-3/4" />
      </div>
      <div className="lg:w-1/2 md:w-2/3 sm:w-3/4 w-full flex items-center justify-center">
        <div className="w-full bg-gray-50/75 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="md:font-semibold leading-tight tracking-tight md:text-2xl text-2xl">
              Sign in
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                required=""
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-100 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
                required=""
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-violet-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                userLogin();
              }}
            >
              Login
            </button>
            <div className="flex items-center justify-between">
              <Link
                to={"/forgot-password"}
                className="text-sm font-medium text-violet-600"
              >
                Forgot password?
              </Link>
            </div>
            <p className="text-sm font-light">
              Don't have account ?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-violet-600"
              >
                Create an account
              </Link>
            </p>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
