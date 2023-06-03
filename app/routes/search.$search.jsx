import { useLoaderData, useOutletContext } from "@remix-run/react";
import search from "../api/endpoint/search";
import AnimeCard from "../components/AnimeCard";
import { useEffect } from "react";
import Container from "../components/Container";

export const meta = ({ data }) => {
  return [
    {
      title: 'Hasil Pencarian "' + data.search + '"',
    },
  ];
};

export const loader = async ({ params }) => {
  const result = await search(params.search);

  return {
    search: params.search,
    result,
  };
};

export default function Search() {
  const { result } = useLoaderData();
  const { setHeaderType } = useOutletContext();

  useEffect(() => {
    setHeaderType("div");
  }, []);

  return (
    <Container containerClassName="my-20 min-h-screen">
      <div className="font-bold font-rubik text-2xl text-gray-800 border-t-2 border-gray-400 flex mb-8">
        <h1 className="-mt-4 bg-gray-200 pr-5">Hasil Pencarian</h1>
      </div>
      {result.length ? (
        <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-8">
          {result.map((item, index) => (
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
    </Container>
  );
}
