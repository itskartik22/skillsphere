import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section class="page_404">
      <div class="w-screen h-screen flex flex-col items-center justify-center gap-2">
          <div class="bg-violet-500 text-white px-10 py-2 rounded-md">
            <h1 class="text-center text-5xl font-bold">404</h1>
          </div>

          <h3 class="text-3xl">Look like you're lost</h3>

          <p>the page you are looking for not avaible!</p>

          <button className="bg-violet-500 text-white py-2 px-4 text-base font-medium rounded-md">
            <Link
              className=""
              to={"/"}
              class="link_404"
            >
              Go to Home
            </Link>
          </button>
      </div>
    </section>
  );
};

export default PageNotFound;
