import Link from "next/link";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const images = [
  "/images/slide1.png",
  "/images/slide2.png",
  "/images/slide3.png",
  "/images/slide4.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const slides: React.ReactNode[] = [
    <img
      key="1"
      src="/images/slide1.png"
      alt="Slide 1"
      className="w-full h-full object-cover"
    />,
    <div
      key="cta-social"
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white p-8"
    >
      <h2 className="text-2xl font-bold mb-4">¡Síguenos!</h2>
      <div className="flex space-x-6">
        <Link
          href="https://instagram.com/mazal_importaciones_srl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <FaInstagram size={28} /> <span>@mazal_importaciones_srl</span>
        </Link>
        <Link
          href="https://youtube.com/@ArielPeker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <FaYoutube size={28} /> <span>@ArielPeker</span>
        </Link>
      </div>
    </div>,
    <img
      key="2"
      src="/images/slide2.png"
      alt="Slide 2"
      className="w-full h-full object-cover"
    />,
    <img
      key="3"
      src="/images/slide4.png"
      alt="Slide 4"
      className="w-full h-full object-cover"
    />,
  ];

  const lastIdx = slides.length - 1;

  const prev = () => setCurrent(current === 0 ? lastIdx : current - 1);
  const next = () => setCurrent(current === lastIdx ? 0 : current + 1);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-md">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`
     absolute inset-0 transition-opacity duration-500
     ${
       idx === current
         ? "opacity-100 pointer-events-auto"
         : "opacity-0 pointer-events-none"
     }
  `}
        >
          {slide}
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`
              w-2 h-2 rounded-full
              ${idx === current ? "bg-white" : "bg-gray-400"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
