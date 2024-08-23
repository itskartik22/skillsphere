import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config/config";
import UserDetails from "./UserDetails";
const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingUserDetails, setLoadingUserDetails] = useState(true);
  const [userDetailsView, setUserDetailsView] = useState(false);
  const [userDetailsById, setUserDetailsById] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      axios({
        url: `${baseUrl}/api/v1/users`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.data);
          setUsers(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
          setLoading(false);
        });
    };

    fetchUsers();
  }, []);

  const handleUserDetailsView = (status, userId) => {
    if (status === false) {
      document.body.style.overflow = "auto";
      setUserDetailsById(null);
      setLoadingUserDetails(true);
    } else {
      document.body.style.overflow = "hidden";
      axios({
        url: `${baseUrl}/api/v1/users/${userId}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data.data);
          setUserDetailsById(res.data.data);
          setLoadingUserDetails(false);
        })
        .catch((err) => {
          setLoadingUserDetails(false);
          alert("Something went wrong");
        });
    }
    setUserDetailsView(!userDetailsView);
  };

  const handleUserSearch = () => {
    setLoading(true);
    axios({
      url: `${baseUrl}/api/v1/users/search?query=${searchQuery}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <div className="px-8 py-4">
      {userDetailsView && (
        <UserDetails
          handleUserDetailsView={handleUserDetailsView}
          loadingUserDetails={loadingUserDetails}
          userDetails={userDetailsById}
        />
      )}
      <header className="w-full flex justify-between items-center gap-5 mb-4">
        <input
          type="text"
          placeholder="Find Users (name, email, id, enrollements)"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 flex-1"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={handleUserSearch}
        />
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
          onClick={handleUserSearch}
        >
          Search User
        </button>
      </header>
      <main>
        <table className="table-auto w-full relative">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="px-4 py-2">S.no</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Id</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Enrolled</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          {loading ? (
            <div className="w-full absolute top-40 flex justify-center items-center h-full">
              <div className="w-20 h-20 border-t-2 border-b-2 border-violet-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2">{index}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.coursesEnrolled.length}</td>
                    <td className="px-4 py-2">
                      {/* <Link
                        to={`/dashboard/users/${user._id}`}
                        className="bg-violet-500 text-white px-2 py-1 rounded-md hover:bg-violet-600 mr-2"
                      >
                        Details
                      </Link> */}
                      <button
                        className="bg-violet-500 text-white px-2 py-1 rounded-md hover:bg-violet-600 mr-2"
                        onClick={() => handleUserDetailsView(true, user._id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </main>
    </div>
  );
};

export default UsersManagement;
