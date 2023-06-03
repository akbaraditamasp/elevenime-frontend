import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Player from "./components/Player";
import { useRef, useState } from "react";

export const links = () => [
  { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png" },
  { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png" },
  { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png" },
  { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png" },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/apple-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/apple-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/apple-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/apple-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/android-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/manifest.json" },
  { name: "msapplication-TileColor", content: "#ffffff" },
  { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
  { name: "theme-color", content: "#ffffff" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&family=Rubik:wght@400;700&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const _player = useRef();
  const [headerType, setHeaderType] = useState("h1");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200">
        <Header element={headerType} />
        <Outlet context={{ player: _player, setHeaderType }} />
        <Footer />
        <Player ref={_player} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
