import { useEffect } from "react";
import detail from "../api/endpoint/detail";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import Container from "../components/Container";
import {
  RiCloseCircleLine,
  RiCloseLine,
  RiPlayCircleLine,
  RiStarLine,
  RiVideoLine,
} from "react-icons/ri";
import { useState } from "react";
import { Fragment } from "react";

export const meta = ({ data }) => {
  return [
    {
      title: "Nonton Anime " + data.anime.title + " Sub Indo",
    },
    {
      description: data.anime.synopsis,
    },
    {
      property: "og:image",
      content: data.anime.image,
    },
    {
      property: "og:description",
      content: data.anime.synopsis,
    },
    {
      property: "og:title",
      content: "Nonton Anime " + data.anime.title + " Sub Indo",
    },
    {
      property: "og:url",
      content: "https://elevenime.aditama.cloud/" + data.anime.id,
    },
    {
      property: "og:type",
      content: "website",
    },
  ];
};

export const loader = async ({ params }) => {
  const anime = await detail(params.anime);

  return {
    anime,
  };
};

export default function Anime() {
  const { anime } = useLoaderData();
  const { setHeaderType, player } = useOutletContext();

  const [showEpisode, setShowEpisode] = useState(false);

  useEffect(() => {
    setHeaderType("div");
  }, []);

  return (
    <Fragment>
      <Container
        containerClassName="min-h-screen mt-10 mb-0 lg:my-10"
        className="p-0 lg:pr-[17.25rem] relative"
      >
        <div className="p-8 bg-white rounded">
          <div className="border-b border-gray-300 flex flex-col lg:flex-row items-center lg:items-start pb-5 mb-5 box-border">
            <div className="w-40 bg-white rounded flex-shrink-0 mr-0 lg:mr-5 p-3 border border-gray-400">
              <div
                className="w-full bg-black relative rounded overflow-hidden"
                style={{ paddingTop: "140%" }}
              >
                <img
                  src={anime.image}
                  className="w-full h-full absolute top-0 left-0"
                />
              </div>
            </div>
            <div className="flex-1 relative w-full">
              <div className="mt-5 lg:mt-0 p-0 lg:p-5 pl-0 lg:pl-3 static lg:absolute top-0 left-0 w-auto lg:w-full flex flex-col items-center lg:items-start">
                <div className="mb-2 flex">
                  <div className="flex items-center py-1 px-2 bg-gray-500 rounded text-white text-sm">
                    <RiStarLine className="text-yellow-400 text-base mr-1" />
                    {anime.rating}
                  </div>
                </div>
                <h1 className="font-bold font-montserrat text-lg lg:text-3xl text-center lg:text-left">
                  {anime.title}
                </h1>
                <div className="mt-5 overflow-x-auto w-full flex">
                  <div className="flex max-w-[5000px] flex-nowrap mx-auto lg:mx-0">
                    {anime.categories.map((item, index) => (
                      <Link
                        to={"/genre/" + item.id}
                        className="mr-3 mb-3 py-2 px-3 border rounded text-xs lg:text-sm bg-gray-100 flex-shrink-0 whitespace-normal"
                        key={`${index}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="font-bold mb-1">Sinopsis</h2>
          <div className="text-justify border-b pb-5 mb-5">
            {anime.synopsis}
          </div>
          <h3 className="font-bold mb-5">Informasi</h3>
          {anime.informations.map((item, index) => (
            <div
              className="mb-3 flex flex-col lg:flex-row items-start lg:items-scretch border rounded"
              key={`${index}`}
            >
              <div className="text-sm lg:text-base w-full lg:w-1/3 border-b lg:border-b-0 border-r-0 lg:border-r px-5 py-3">
                {item.type}
              </div>
              <div className="flex-1 px-5 py-3 text-left lg:text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`fixed lg:absolute z-10 lg:z-0 top-0 right-0 bottom-0 w-full lg:w-64 bg-white rounded-none lg:rounded flex flex-col transition duration-500 transform ${
            showEpisode ? "translate-y-0" : "translate-y-full"
          } lg:translate-y-0`}
        >
          <div className="border-b p-3 px-5 lg:p-5 font-bold flex items-center">
            <h3>Episode</h3>
            <button
              type="button"
              onClick={() => setShowEpisode(false)}
              className="ml-auto block lg:hidden py-3 px-5 -mr-5 text-xl"
            >
              <RiCloseLine />
            </button>
          </div>
          <div className="p-5 overflow-auto flex-1">
            {anime.episodes.map((item, index) => (
              <button
                type="button"
                className="mb-5 border rounded p-5 w-full flex items-center hover:bg-gray-100"
                key={`${index}`}
                onClick={() => player.current.open(item.id)}
              >
                Episode {item.value}
                <RiPlayCircleLine className="text-xl ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </Container>
      <div className="sticky bottom-0 left-0 w-full bg-gray-200 p-5 block lg:hidden">
        <button
          onClick={() => setShowEpisode(true)}
          type="button"
          className="bg-primary-500 py-3 px-5 text-center w-full text-white rounded flex items-center justify-center"
        >
          <RiVideoLine className="text-xl mr-2" />
          Tonton
        </button>
      </div>
    </Fragment>
  );
}
