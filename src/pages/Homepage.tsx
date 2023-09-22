import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="text-richblack">
      <header className="font-croissant text-5xl text-center sm:text-7xl">
        Resize fast, prepare it faster
      </header>
      <p className="text-center sm:text-3xl p-2 text-2xl mt-3">
        <span className="font-croissant">Reciper  </span>
        is the best tool for resizing recipes, with intuitive UI and great
        tooling.
      </p>
      <div className="flex justify-center md:text-3xl text-xl sm:text-2xl gap-3 mt-7">
        <Link to='/new' className="border-2 border-nn rounded-full p-2 hover:scale-110 transition-all">
        New Recipe
        </Link>
        <Link to='/myrecipes' className="p-2 group">
        <span>
        My Recipes
        </span>
        <div className="group-hover:w-full transition-all group-hover:visible h-[2px] invisible w-0 bg-nn"></div>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
