import axios from "axios";
import { useContext, useState } from "react";
import baseURL from "../../config/config";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertDispatchContext } from "../../context/Context";

const ResetPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event) => {
    if(password.length === 0 || confirmPassword.length === 0){
      dispatchAlertHandler({
        type: "error",
        message: "Password and Confirm Password should not be empty",
      });
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (password !== confirmPassword) {
      dispatchAlertHandler({
        type: "error",
        message: "Password and Confirm Password should match",
      });
      setPassword("");
      setConfirmPassword("");
      return;
    }
    event.preventDefault();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    
    axios({
      method: "POST",
      url: `${baseURL}/api/v1/users/resetUserPassword/${token}`,
      data: {
        auth: {
          password,
          confirmPassword,
        },
        resetToken: token,
      },
    })
      .then((response) => {
        dispatchAlertHandler({
          type: "success",
          message: "Password Changed Successfully!",
        });
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch((error) => {
        dispatchAlertHandler({
          type: "error",
          message: error.response.data.message,
        });
        setPassword("");
        setConfirmPassword("");
      });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold m-4">Reset Password</h1>
      <form
        className="flex flex-col gap-5 m-4 border-4 p-6"
        onSubmit={handlePasswordChange}
      >
        <div className="flex justify-between gap-5">
          <label htmlFor="">New Password</label>
          <input
            className="cursor-pointer border-2 px-1"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="flex justify-between gap-5">
          <label htmlFor="">Confirm New Password</label>
          <input
            className="cursor-pointer border-2 px-1"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="w-fit text-white self-center bg-violet-500 px-6 py-2 rounded-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
