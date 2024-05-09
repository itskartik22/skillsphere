import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div className="px-8 py-4">
      <header
        className="
            w-full
            flex
            justify-between
            items-center
            gap-5
            mb-4
        "
      >
        <input
          type="text"
          placeholder="Filter Courses"
          className="
                px-4
                py-2
                border
                border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-violet-500
                flex-1
            "
        />
        <Link
          to="/dashboard/courses/add"
          className="
                bg-violet-500
                text-white
                px-4
                py-2
                rounded-md
                hover:bg-violet-600
            "
        >
          +Add Course
        </Link>
      </header>
      <main>
        <table className="w-full">
          <thead>
            <tr
              className="
                        bg-gray-200
                        text-gray-600
                        text-left
                    "
            >
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="
                        border-b
                        border-gray-200
                    "
            >
              <td className="px-4 py-2">Full Stack Web Development</td>
              <td className="px-4 py-2">Abhinav Roy</td>
              <td className="px-4 py-2">₹500</td>
              <td className="px-4 py-2">
                <Link
                  to="/dashboard/courses/edit/1"
                  className="
                                bg-violet-500
                                text-white
                                px-2
                                py-1
                                rounded-md
                                hover:bg-violet-600
                                mr-2
                            "
                >
                  Edit
                </Link>
                <button
                  className="
                                bg-red-500
                                text-white
                                px-2
                                py-1
                                rounded-md
                                hover:bg-red-600
                            "
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr
              className="
                        border-b
                        border-gray-200
                    "
            >
              <td className="px-4 py-2">Full Stack Web Development</td>
              <td className="px-4 py-2">Abhinav Roy</td>
              <td className="px-4 py-2">₹500</td>
              <td className="px-4 py-2">
                <Link
                  to="/dashboard/courses/edit/1"
                  className="
                                bg-violet-500
                                text-white
                                px-2
                                py-1
                                rounded-md
                                hover:bg-violet-600
                                mr-2
                            "
                >
                  Edit
                </Link>
                <button
                  className="
                                bg-red-500
                                text-white
                                px-2
                                py-1
                                rounded-md
                                hover:bg-red-600
                            "
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Courses;
