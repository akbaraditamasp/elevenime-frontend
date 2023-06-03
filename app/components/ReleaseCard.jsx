import { RiPlayCircleLine } from "react-icons/ri";

export default function ReleaseCard({ image, name, onClick = () => {} }) {
  return (
    <div className="relative group">
      <div
        className="w-full relative bg-white rounded overflow-hidden"
        style={{
          paddingTop: "67.53%",
        }}
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={image}
          alt={name}
          title={name}
        />
        <div className="hidden group-hover:flex absolute bg-black bg-opacity-50 top-0 left-0 w-full h-full items-center justify-center">
          <RiPlayCircleLine className="text-6xl text-white" />
        </div>
      </div>
      <div className="mt-2 line-clamp-2 font-bold text-sm text-gray-800">
        {name}
      </div>
      <button
        type="button"
        onClick={onClick}
        className="absolute top-0 left-0 w-full h-full"
      ></button>
    </div>
  );
}
