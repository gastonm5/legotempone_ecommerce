import { useState } from "react";
import "../styles/main.css";

const productsByCategory = {
  populares: [
    { id: 1, title: "Lego Madriguera", image: "/img/lamadriguera.png" },
    { id: 2, title: "Lego Gran Comedor", image: "/img/grancomedor.png" },
    { id: 3, title: "Lego Hogwarts", image: "/img/hogwarts.png" },
    { id: 4, title: "Lego Auto Volador", image: "/img/autovolador.png" },
  ],
  lugares: [
    { id: 5, title: "Lego Hogwarts", image: "/img/hogwarts.png" },
    { id: 6, title: "Lego Hagrid House", image: "/img/casahagrid.png" },
    { id: 7, title: "Lego Tren Station", image: "/img/estaciondetren.png" },
    { id: 8, title: "Lego Malfoy's Mansion", image: "/img/mansionMalfoy.png" },
  ],
  personajes: [
    { id: 9, title: "BuckBeack", image: "/img/buckbeak.png" },
    { id: 10, title: "Hagrid", image: "/img/hagrid.png" },
    { id: 11, title: "Voldemort", image: "/img/voldemort.png" },
    { id: 12, title: "Malfoy", image: "/img/malfoy.png" },
  ],
};

const Main = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("populares");

  const currentProducts = productsByCategory[activeFilter];

  return (
    <main className="main-section">
      <div className="main-header">
        <h2
          className={`main-title ${activeFilter === "populares" ? "active-filter" : ""}`}
          onClick={() => setActiveFilter("populares")}
        >
          Más Populares
        </h2>

        <div className="main-filters">
          <a
            href="#"
            className={activeFilter === "lugares" ? "active-filter" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveFilter("lugares");
            }}
          >
            Lugares
          </a>
          <a
            href="#"
            className={activeFilter === "personajes" ? "active-filter" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveFilter("personajes");
            }}
          >
            Personajes
          </a>
        </div>
      </div>

      <div className="card-container">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`card ${hoveredId !== null && hoveredId !== product.id ? "dimmed" : ""}`}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="image-wrapper">
              <p className="card-text">{product.title}</p>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        ))}
      </div>

      <img
        className="slope-image"
        src="https://assets.lego.com/brick-breaker-banner-styles/latest/downSlope3-desktop-v1.svg"
        alt="slope divider"
      />
    </main>
  );
};

export default Main;
