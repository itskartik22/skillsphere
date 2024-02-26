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
  const login = async ({ userEmail, userPassword }) => {
    await axios
      .post(`${baseURL}/api/v1/users/login`, {
        email: userEmail,
        password: userPassword,
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
        // console.error(err);
        // alert(err.response.data.message);
        dispatchAlertHandler({
          type: "error",
          message: err.response.data.message,
        });
      });
  };
  const signup = async ({ userName, userEmail, userPassword }) => {
    await axios
      .post(`${baseURL}/api/v1/users/signup`, {
        username: userName,
        email: userEmail,
        password: userPassword,
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
  const logout = () => {
    setUser(null);
    dispatchAlertHandler({
      type: "success",
      message: "You are logged out.",
    });
    navigate("/");
  };

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
