const Paginate = ({ coursesPerPage, totalCourses, paginate, nextPage, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="w-full flex justify-center gap-2 py-4">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 ${currentPage === number ? "bg-violet-500 text-white" : "bg-gray-50 text-black"} hover:bg-violet-500 hover:text-white shadow-md rounded-lg`}
                >
                    {number}
                </button>
            ))}
            <button  className="px-4 py-2 bg-gray-50 text-black hover:bg-violet-500 hover:text-white shadow-md rounded-lg" onClick={() => nextPage()}>
                Next
            </button>
        </div>
    );
}

export default Paginate;