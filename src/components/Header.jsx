import { useEffect, useRef, useState } from "react";
import "../styles/carousel.css";

const images = [
  "/img/harrybanner6.png",
  "/img/harrybanner7.jpg",
  "/img/harrybanner1.jpg",
  "/img/harrybanner5.png"
];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
  const timeout = setInterval(() => {
    nextSlide();
  }, 5000); 

  return () => clearInterval(timeout);
}, [current]);

  return (
    <header className="carousel-container">
      <div className="carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`slide ${index === current ? "active" : ""}`}
          />
        ))}
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </header>
  );
};

export default Header;
