import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import genre from "../api/endpoint/genre";
import AnimeCard from "../components/AnimeCard";
import Container from "../components/Container";

export const meta = ({ data }) => {
  return [
    {
      title: "Genre " + data.id,
    },
  ];
};

export const loader = async ({ params }) => {
  const result = await genre(params.genre);

  return {
    id: params.genre,
    name: `${params.genre}`.toUpperCase(),
    result,
  };
};

export default function Genre() {
  const { result, name, id } = useLoaderData();
  const { setHeaderType } = useOutletContext();

  const [data, setData] = useState(result);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadRelease = (page) => {
    setLoading(true);
    genre(id, page).then((data) => {
      setPage(page);
      setLoading(false);
      setData((value) => value.concat(data));
    });
  };

  useEffect(() => {
    setHeaderType("div");
  }, []);

  return (
    <Container containerClassName="my-20 min-h-screen">
      <div className="font-bold font-rubik text-2xl text-gray-800 border-t-2 border-gray-400 flex mb-8">
        <h1 className="-mt-4 bg-gray-200 pr-5">{name}</h1>
      </div>
      {data.length ? (
        <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
          {data.map((item, index) => (
            <AnimeCard
              id={item.id}
              key={`${index}`}
              name={item.title}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-5 text-center">Hasil tidak ditemukan</div>
      )}
      {!loading && data.length && (
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
  );
}
