import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight, GoSearch } from "react-icons/go";
import latest from "../api/endpoint/latest";
import ongoing from "../api/endpoint/ongoing";
import AnimeCard from "../components/AnimeCard";
import Container from "../components/Container";
import ReleaseCard from "../components/ReleaseCard";

export const meta = () => {
  return [
    {
      title: "Nonton Anime Sub Indo Gratis - Elevenime",
    },
    {
      description:
        "Elevenime adalah website layanan streaming anime gratis (tanpa iklan) dengan subtitle Bahasa Indonesia",
    },
    {
      property: "og:image",
      content: "https://elevenime.aditama.cloud/cover.png",
    },
    {
      property: "og:description",
      content:
        "Elevenime adalah website layanan streaming anime gratis (tanpa iklan) dengan subtitle Bahasa Indonesia",
    },
    {
      property: "og:title",
      content: "Nonton Anime Sub Indo Gratis - Elevenime",
    },
    {
      property: "og:url",
      content: "https://elevenime.aditama.cloud",
    },
    {
      property: "og:type",
      content: "website",
    },
  ];
};

export const loader = async () => {
  const trending = await ongoing();
  const release = await latest();

  return {
    trending,
    release,
  };
};

export default function Index() {
  const { trending, release } = useLoaderData();
  const { player, setHeaderType } = useOutletContext();
  const navigate = useNavigate();

  const [sliderPos, setSliderPos] = useState(0);
  const [smallSliderPos, setSmallSliderPos] = useState(0);
  const [data, setData] = useState(release);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadRelease = (page) => {
    setLoading(true);
    latest(page).then((data) => {
      setPage(page);
      setLoading(false);
      setData((value) => value.concat(data));
    });
  };

  useEffect(() => {
    setHeaderType("h1");
  }, []);

  return (
    <Fragment>
      <Container className="h-screen flex items-center justify-center">
        <img
          src="https://www.idprocloud.com/api/clic1td1x01zkjpv07p375zmu?image=1080&quality=75"
          alt="Elevenime Hero Background"
          title="Elevenime Hero Background"
          className="object-cover absolute top-0 left-0 w-full h-screen"
        />
        <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-80"></div>
        <div className="text-center relative flex flex-col items-center">
          <h2 className="text-2xl lg:text-4xl font-bold font-montserrat text-white">
            Nonton Anime Sub Indo Gratis
          </h2>
          <p className="text-gray-200 text-base lg:text-lg w-full lg:w-2/3 mt-1">
            Elevenime adalah website layanan streaming anime gratis (tanpa
            iklan) dengan subtitle Bahasa Indonesia
          </p>
          <div className="relative mt-10">
            <input
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (event.target.value) {
                    navigate(
                      "/search/" + encodeURIComponent(event.target.value)
                    );
                  }
                }
              }}
              type="text"
              placeholder="Cari anime..."
              className="w-64 lg:w-[364px] h-16 rounded-full bg-white bg-opacity-20 px-5 text-white pr-16"
            />
            <div className="absolute top-0 right-0 w-16 h-full flex justify-center items-center text-xl text-white">
              <GoSearch />
            </div>
          </div>
        </div>
      </Container>
      <Container containerClassName="my-20">
        <div className="font-bold font-rubik text-2xl text-gray-800 border-t-2 border-gray-400 flex mb-8">
          <h3 className="-mt-4 bg-gray-200 pr-5">Anime Trending</h3>
        </div>
        <div className="overflow-x-hidden relative hidden lg:block">
          <div
            className="flex flex-nowrap max-w-[9000px] transition duration-300"
            style={{
              transform: `translateX(-${20 * sliderPos}%)`,
            }}
          >
            {trending.map((item, index) => (
              <AnimeCard
                id={item.id}
                className="w-[20%] px-4 flex-shrink-0"
                key={`${index}`}
                name={item.title}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
          {sliderPos > 0 && (
            <div className="flex items-center absolute top-0 left-0 h-full pb-8">
              <button
                onClick={() => {
                  setSliderPos((value) => value - 1);
                }}
                type="button"
                className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
              >
                <GoChevronLeft />
              </button>
            </div>
          )}
          {sliderPos < trending.length - 5 && (
            <div className="flex items-center absolute top-0 right-0 h-full pb-8">
              <button
                onClick={() => {
                  setSliderPos((value) => value + 1);
                }}
                type="button"
                className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
              >
                <GoChevronRight />
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-hidden relative block lg:hidden">
          <div
            className="flex flex-nowrap max-w-[9000px] transition duration-300"
            style={{
              transform: `translateX(-${50 * smallSliderPos}%)`,
            }}
          >
            {trending.map((item, index) => (
              <AnimeCard
                id={item.id}
                className="w-[50%] px-4 flex-shrink-0"
                key={`${index}`}
                name={item.title}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
          {smallSliderPos > 0 && (
            <div className="flex items-center absolute top-0 left-0 h-full pb-8">
              <button
                onClick={() => {
                  setSmallSliderPos((value) => value - 1);
                }}
                type="button"
                className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
              >
                <GoChevronLeft />
              </button>
            </div>
          )}
          {smallSliderPos < trending.length - 2 && (
            <div className="flex items-center absolute top-0 right-0 h-full pb-8">
              <button
                onClick={() => {
                  setSmallSliderPos((value) => value + 1);
                }}
                type="button"
                className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
              >
                <GoChevronRight />
              </button>
            </div>
          )}
        </div>
      </Container>
      <Container containerClassName="my-20">
        <div className="font-bold font-rubik text-2xl text-gray-800 border-t-2 border-gray-400 flex mb-8">
          <h3 className="-mt-4 bg-gray-200 pr-5">Rilis Terbaru</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row gap-8">
          {data.map((item, index) => (
            <ReleaseCard
              onClick={() => player.current.open(item.id)}
              key={`${index}`}
              image={item.image}
              name={item.title}
            />
          ))}
        </div>
        {!loading && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => loadRelease(page + 1)}
              className="py-2 px-5 bg-gray-700 text-white rounded-full"
            >
              Lebih Banyak
            </button>
          </div>
        )}
      </Container>
    </Fragment>
  );
}
