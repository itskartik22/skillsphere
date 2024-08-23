import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const UserDetails = ({
  handleUserDetailsView,
  userDetails,
  loadingUserDetails,
}) => {
  const [notificationWriteBoxVisiblity, setNotificationWriteBoxVisiblity] =
    useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSendNotification = () => {};

  const handleNotificationWriteBox = () => {
    setNotificationWriteBoxVisiblity(!notificationWriteBoxVisiblity);
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-gray-950/50 z-10 flex justify-center items-center">
      {loadingUserDetails ? (
        <div className="w-full flex justify-center items-center h-full">
          <div className="w-20 h-20 border-t-2 border-b-2 border-violet-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative w-3/5 bg-white p-6 rounded-md flex flex-col gap-4">
          <div className="p-4 bg-violet-800 rounded-md flex justify-center">
            <div className="flex flex-col gap-2 items-center">
              <img
                src={userDetails?.profilePhoto}
                alt="profile-photo"
                className="w-24 h-24 rounded-full"
              />
              <div className="flex flex-col items-center">
                <span className="text-2xl text-white font-medium">
                  {userDetails?.profile.firstName
                    ? userDetails?.profile.firstName +
                      " " +
                      userDetails?.profile.lastName
                    : userDetails?.username}
                </span>
                <span className="text-white">
                  {/* {userDetails?.userType} */}
                  Student
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4">
            <div className="w-1/2">
              <div>
                <span className="font-medium">User Id</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?._id}
                </p>
              </div>
              <div>
                <span className="font-medium">Email</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.email}
                </p>
              </div>
              <div>
                <span className="font-medium">Username</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.username}
                </p>
              </div>
              <div>
                <span className="font-medium">Role</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.role}
                </p>
              </div>
              <div>
                <span className="font-medium">CreatedAt</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.createdAt}
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <span className="font-medium">Date of Birth</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.profile?.dateOfBirth
                    ? userDetails.profile.dateOfBirth.split("T")[0]
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium">Contact</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.profile.contact
                    ? userDetails?.profile.contact
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium">Course Persuing</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.profile.coursePersuing
                    ? userDetails?.profile.coursePersuing
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium">College</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.profile.college
                    ? userDetails?.profile.college
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium">Address</span>
                <p className="border-[1px] border-gray-400 p-2 rounded-md">
                  {userDetails?.profile.address
                    ? userDetails?.profile.address +
                      " (" +
                      userDetails?.profile.country +
                      ")"
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="flex flex-col items-center gap-0">
              <span className="font-medium">Courses Enrolled</span>
              <span className="text-2xl font-medium">
                {userDetails?.coursesEnrolled.length}
              </span>
            </div>
            <div className="w-[4px] h-10 rounded-md bg-gray-600"></div>
            <div className="flex flex-col items-center gap-0">
              <span className="font-medium">Cart Courses</span>
              <span className="text-2xl font-medium">
                {userDetails?.cartCourses.length}
              </span>
            </div>
            <div className="w-[4px] h-10 rounded-md bg-gray-600"></div>
            <div className="flex flex-col items-center gap-0">
              <span className="font-medium">Wishlist</span>
              <span className="text-2xl font-medium">5</span>
            </div>
          </div>
          <div className="w-full flex justify-end items-stretch gap-2">
            {/* <input
              type="text"
              className="border-2 rounded-md border-violet-800 px-3 py-2"
            /> */}
            {notificationWriteBoxVisiblity && (
              <div className="">
                <input
                  type="text"
                  placeholder="Write Notification"
                  className="border-2 rounded-md border-violet-800 px-3 py-2"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                />
                <button
                  className="bg-violet-800 text-white px-2 py-1 rounded-md"
                  onClick={handleSendNotification}
                >
                  Send
                </button>
              </div>
            )}
            <button className="bg-violet-800 text-white px-2 py-1 rounded-md w-36">
              Send Message
            </button>
          </div>
          <button
            className="absolute top-5 right-5"
            onClick={() => handleUserDetailsView(false)}
          >
            <RxCross2 className="text-3xl h-10 w-10 p-1 shadow-md text-violet-800 bg-white rounded-full font-medium" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
