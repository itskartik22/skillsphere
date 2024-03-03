import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import baseURL from "../../config/config";
import { useAuth } from "../../hooks/useAuth";
import LineSkeleton from "../animation/skeletons/LineSkeleton";
import { AlertDispatchContext } from "../../context/Context";
const Profile = () => {
  const { user } = useAuth();
  const dispatchAlertHandler = useContext(AlertDispatchContext);
  const token = user.token;
  const [popEditWindow, setPopEditWindow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    profilePhoto: "",
    profile: {
      firstName: "",
      lastName: "",
      gender: "",
      contact: "",
      country: "",
      address: "",
      coursePersuing: "",
      college: "",
      dateOfBirth: "",
    },
  });
  const [infoEdit, setInfoEdit] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contact: "",
    country: "",
    address: "",
    coursePersuing: "",
    college: "",
    dateOfBirth: "",
  });
  //Storing photo changes
  const [profilePhoto, setProfilePhoto] = useState(null);
  useEffect(() => {
    //Fetching userInformation
    axios({
      method: "get",
      url: `${baseURL}/api/v1/users/user-profile`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setLoading(false);
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }, [setUserInfo, token, formData]);
  const handleFormData = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditProfile = () => {
    setPopEditWindow((prev) => !prev);
  };
  function handleFormSubmition(event) {
    event.preventDefault();
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/users/user-profile`,
      headers: { Authorization: "Bearer " + token },
      data: formData,
    })
      .then((res) => {
        dispatchAlertHandler({
          type: "success",
          message: "Profile updated sucessfully.",
        });
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "error",
          message: "Failed to upload photo!.",
        });
      });
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      contact: "",
      country: "",
      address: "",
      coursePersuing: "",
      college: "",
      dateOfBirth: "",
    });
  }
  function handleProfilePhotoChange(event) {
    event.preventDefault();
    const ImgData = new FormData();
    ImgData.append("image", profilePhoto);
    axios({
      method: "post",
      url: `${baseURL}/api/v1/users/upload`,
      headers: { Authorization: "Bearer " + token },
      data: ImgData,
    })
      .then((res) => {
        dispatchAlertHandler({
          type: "success",
          message: "Profile photo uploaded seccessful.",
        });
      })
      .catch((err) => {
        dispatchAlertHandler({
          type: "error",
          message: "Upload failed!.",
        });
      });
    setProfilePhoto(null);
  }
  return (
    <div
      className={`${
        popEditWindow ? "fixed" : ""
      } md:w-3/4 w-full flex flex-row my-8 gap-4 rounded-md shadow-lg md:p-8 p-4`}
    >
      {/* Editing Window */}
      <div
        className={`${
          popEditWindow ? "flex" : "hidden"
        } justify-center items-center fixed top-0 left-0 w-screen h-screen z-20 bg-gray-300/75`}
      >
        <div className="lg:w-3/6 md:w-4/6 w-full flex flex-col gap-4 relative bg-white rounded-md md:p-10 px-4 py-6">
          <button className="absolute top-0 right-2">
            <RxCross2
              className="absolute top-5 right-4 md:text-3xl text-2xl"
              onClick={() => handleEditProfile()}
            />
          </button>
          <h3 className="text-lg font-semibold">Edit Details</h3>
          {infoEdit ? (
            <form
              className="flex flex-col gap-3"
              onSubmit={handleFormSubmition}
            >
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="firstName"
                  placeholder="Anaya"
                  value={formData.firstName}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="lastName"
                  placeholder="Shree"
                  value={formData.lastName}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="date"
                  name="dateOfBirth"
                  placeholder=""
                  value={formData.dateOfBirth}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormData}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="country">
                  Country
                </label>
                <select
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  name="country"
                  value={formData.country}
                  onChange={handleFormData}
                  required
                >
                  <option value="">Select</option>
                  <option value="India(+91)">India(+91)</option>
                  <option value="Nepal(+977)">Nepal(+977)</option>
                  <option value="Pakistan(+92)">Pakistan(+92)</option>
                  <option value="Bangladesh(+880)">Bangladesh(+880)</option>
                  <option value="Srilanka(+94)">Srilanka(+94)</option>
                </select>
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="contact">
                  Mobile
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="contact"
                  placeholder="9608XXXXXX"
                  value={formData.contact}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="address">
                  Address
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="address"
                  placeholder="No-12/45 Loyal Street, Kolkata "
                  value={formData.address}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="coursePersuing">
                  Course
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="coursePersuing"
                  placeholder="B.Tech or B.Sc"
                  value={formData.coursePersuing}
                  onChange={handleFormData}
                  required
                />
              </div>
              <div className="flex items-center justify-between md:gap-20 gap-5">
                <label className="w-3/12 font-medium" htmlFor="college">
                  College
                </label>
                <input
                  className="w-8/12 border-2 border-gray-500 px-2 py-1 rounded-md"
                  type="text"
                  name="college"
                  placeholder="Satyayug Nalanda University"
                  value={formData.college}
                  onChange={handleFormData}
                  required
                />
              </div>
              <button
                type="submit"
                className="md:w-1/3 self-end text-white bg-violet-500 px-4 py-2 mt-2 rounded-md"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col justify-start gap-5"
              onSubmit={handleProfilePhotoChange}
            >
              <div className="flex gap-5">
                <label htmlFor="">Select Photo:</label>
                <input
                  className="cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setProfilePhoto(event.target.files[0]);
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-fit text-white bg-violet-500 px-6 py-2 rounded-md"
              >
                Change Photo
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Profile View */}
      <div className="w-full flex md:flex-row md:items-start items-center flex-col gap-10">
        <div className="relative md:w-52 w-fit flex h-fit md:justify-end justify-center">
        <img
            src={userInfo.profilePhoto}
            alt="profileImg"
            className="w-40 max-h-40 rounded-full"
          />

          <button
            className="absolute bottom-0 right-0 text-white bg-violet-500 px-2 py-2 border-white border-4 rounded-full"
            onClick={() => {
              handleEditProfile();
              setInfoEdit(false);
            }}
          >
            <FaCamera className="text-2xl" />
          </button>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-medium">Profile Details</h2>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h4 className="w-3/12 text-sm font-medium text-gray-400">
              Personal Detail
            </h4>
            <div className="w-8/12 h-1 bg-gray-400/50"></div>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Name</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.firstName ? (
                userInfo.profile.firstName + " " + userInfo.profile.lastName
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Email</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.email ? (
                userInfo.email
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Username</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.username ? (
                userInfo.username
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Date of Birth</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.dateOfBirth ? (
                userInfo.profile.dateOfBirth.split("T")[0]
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Gender</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.gender ? (
                userInfo.profile.gender
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Mobile</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.contact ? (
                userInfo.profile.contact
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-start md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Country</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.country ? (
                userInfo.profile.country
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-start md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Address</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.address ? (
                userInfo.profile.address
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-center md:gap-5 gap-6 p-2">
            <h4 className="w-3/12 text-sm font-medium text-gray-400">
              Academic Detail
            </h4>
            <div className="w-8/12 h-1 bg-gray-400/50"></div>
          </div>
          <div className="w-full flex flex-row items-start md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">Course</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.coursePersuing ? (
                userInfo.profile.coursePersuing
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="w-full flex flex-row items-start md:gap-5 gap-6 p-2">
            <h2 className="w-3/12 text-base font-medium">College</h2>
            <h2 className="w-9/12 text-base font-medium">
              {loading ? (
                <LineSkeleton />
              ) : userInfo && userInfo.profile.college ? (
                userInfo.profile.college
              ) : (
                "NA"
              )}
            </h2>
          </div>
          <div className="flex md:justify-start gap-6 px-2 py-4">
            <button
              className="text-white bg-violet-500 px-4 py-2 rounded-md"
              onClick={() => {
                setInfoEdit(true);
                handleEditProfile();
              }}
            >
              Edit Profile
            </button>
            <button className="text-white bg-violet-500 px-4 py-2 rounded-md">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
