import axios from "axios";
import { useContext, useState } from "react";
import baseURL from "../../config/config";
import { AlertDispatchContext } from "../../context/Context";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [formActive, setFormActive] = useState(true);
  const dispatchAlertHandler = useContext(AlertDispatchContext);

  const handleRequestPasswordChange = (event) => {
    event.preventDefault();
    if (userEmail === "") {
      dispatchAlertHandler({
        type: "error",
        message: "Email should not be empty",
      });
      return;
    }
    axios({
      method: "POST",
      url: `${baseURL}/api/v1/users/forgotUserPassword`,
      data: {
        email: userEmail,
      },
    })
      .then((response) => {
        dispatchAlertHandler({
          type: "success",
          message: response.data.message,
        });
        setUserEmail("");
        setFormActive(false);
      })
      .catch((error) => {
        dispatchAlertHandler({
          type: "error",
          message: error.response.data.message,
        });
        setUserEmail("");
      });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold m-4">Forgot Password</h1>
      {formActive ? (
        <form
          className="flex flex-col gap-5 m-4 border-4 p-6"
          onSubmit={handleRequestPasswordChange}
        >
          <div className="flex justify-between gap-5">
            <label htmlFor="">User Email</label>
            <input
              className="cursor-pointer border-2 px-1"
              type="email"
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
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
      ) : (
        <p className="flex flex-col gap-5 m-4 border-4 p-6">
          Password Reset Link Sent to your Email. Please check your Email.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
