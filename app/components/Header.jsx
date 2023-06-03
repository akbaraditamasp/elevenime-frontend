import { Link, useNavigate } from "@remix-run/react";
import Container from "./Container";
import { GoSearch } from "react-icons/go";
import { Fragment, useEffect, useState } from "react";

export default function Header({ element: Element = "h1" }) {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (Element === "h1") {
      const scroll = (event) => {
        const scrolled =
          window.pageYOffset || document.documentElement.scrollTop;
        setScrollY(scrolled);
      };
      window.addEventListener("scroll", scroll);

      return () => {
        window.removeEventListener("scroll", scroll);
      };
    }
  }, []);
  return (
    <Fragment>
      <Container
        containerClassName={`bg-white shadow fixed top-0 left-0 w-full z-10 transition duration-500 transform ${
          scrollY > 10 || Element !== "h1"
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
        className="h-20 flex items-center"
        element="header"
      >
        <Element className="mr-5">
          <Link
            to="/"
            title="Streaming Anime Sub Indo Gratis - Elevenime"
            className="font-bold font-montserrat text-xl text-gray-800 flex items-center"
          >
            <span className="h-12 w-12 flex justify-center items-center rounded bg-gray-800 text-white text-xl">
              E
            </span>
            <span className="hidden lg:inline ml-3">ELEVENIME</span>
          </Link>
        </Element>
        <div className="ml-auto w-full lg:w-1/3 relative">
          <input
            type="text"
            className="w-full border border-gray-300 rounded h-12 p-2"
            placeholder="Cari..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (event.target.value) {
                  navigate("/search/" + encodeURIComponent(event.target.value));
                }
              }
            }}
          />
          <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center">
            <GoSearch />
          </div>
        </div>
      </Container>

      {Element !== "h1" && <div className="h-20 mb-8" />}
    </Fragment>
  );
}
