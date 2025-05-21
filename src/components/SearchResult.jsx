import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Nav";
import Footer from "./Footer";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter(product => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(query) || description.includes(query);
    });
    setResults(filtered);
  }, [query, allProducts]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Producto agregado al carrito`);
  };

  return (
    <>
      <Navbar isFixed={false} darkMode={true} />
      <div>
        <h2>Resultados para: "{query}"</h2>
        {results.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {results.map(item => (
              <div key={item.id} style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>Precio:</strong> ${item.price}</p>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => addToCart(item)}
                >
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
