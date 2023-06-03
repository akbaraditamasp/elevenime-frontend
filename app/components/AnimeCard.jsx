import { Link } from "@remix-run/react";
import { RiStarLine } from "react-icons/ri";

export default function AnimeCard({ className = "", id, rating, name, image }) {
  return (
    <div className={className + " relative"}>
      <div
        style={{ paddingTop: "140%" }}
        className="relative bg-white rounded overflow-hidden"
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={image}
          alt={name}
          title={name}
        />
        <div className="absolute top-0 right-0 m-1 text-xs flex items-center bg-black bg-opacity-70 text-white py-1 px-2 rounded-sm">
          <RiStarLine className="text-yellow-400 text-base mr-1" />
          {rating}
        </div>
      </div>
      <div className="mt-2 line-clamp-2 font-bold text-sm text-center text-gray-800">
        {name}
      </div>
      <Link
        to={"/" + id}
        className="absolute top-0 left-0 w-full h-full"
        title={name}
      ></Link>
    </div>
  );
}
