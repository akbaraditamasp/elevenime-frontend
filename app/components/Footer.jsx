import { RiHeart2Line } from "react-icons/ri";
import Container from "./Container";

export default function Footer() {
  return (
    <Container
      containerClassName="bg-gray-700"
      className="text-center py-5 border-t border-gray-800 text-white"
    >
      Crafted with <RiHeart2Line className="inline" /> by{" "}
      <a
        href="https://instagram.com/akbaraditamasp"
        title="Akbar Aditama Supriyono Putra"
      >
        Akbar Aditama
      </a>
    </Container>
  );
}
