import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/images/slide1.png",
  "/images/slide2.png",
  "/images/slide3.png",
  "/images/slide4.png",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const lastIdx = images.length - 1;

  const prev = () => setCurrent(current === 0 ? lastIdx : current - 1);
  const next = () => setCurrent(current === lastIdx ? 0 : current + 1);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-md">
      {/* Slides */}
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Slide ${idx + 1}`}
          className={`
            absolute top-0 left-0 w-full h-full object-cover
            transition-opacity duration-500
            ${idx === current ? "opacity-100" : "opacity-0"}
          `}
        />
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
        {images.map((_, idx) => (
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
