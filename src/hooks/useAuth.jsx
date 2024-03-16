import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../config/config.js";
import { AlertDispatchContext } from "../context/Context.js";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const navigate = useNavigate();

  //Authetication Function
  //  Login Function
  const login = async ({ userEmail, userPassword }) => {
    await axios({
        method: "post",
        url: `${baseURL}/api/v1/users/login`,
        data: {
          email: userEmail,
          password: userPassword,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        dispatchAlertHandler({
          type: "success",
          message: "You are logged in.",
        });
        navigate("/");
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "error",
          message: "Invalid email or password.",
        });
      });
  };

  //Signup Function
  const signup = async ({ userName, userEmail, userPassword }) => {
    await axios({
        url: `${baseURL}/api/v1/users/signup`,
        method: "post",
        data: {
          username: userName,
          email: userEmail,
          password: userPassword,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        dispatchAlertHandler({
          type: "success",
          message: "You are logged in.",
        });
        navigate("/");
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "error",
          message: err.response.data.message,
        });
      });
  };
  const logout = async () => {
    await axios({
        url: `${baseURL}/api/v1/users/logout`,
        method: "post",
        withCredentials: true,
      })
      .then((res) => {
        dispatchAlertHandler({
          type: "success",
          message: "succefully logout.",
        });
        navigate("/");
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "error",
          message: "failed to logout.",
        });
      });
    setUser(null);
    navigate("/");
  };
  const sessionExpiredLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({ user, login, signup, logout, sessionExpiredLogout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
