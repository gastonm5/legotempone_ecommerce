import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/products.css";
import "../../styles/productDetail.css";
import { Link, useNavigate } from "react-router-dom";
import localProducts from "../../../backend/data/products";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fakeLoading, setFakeLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const stored = localStorage.getItem("products");
        let parsed = null;

        // 1. primero pruebo buscar los productos en localstorage porque cuando cargeu la pagina 
        // por primera vez me deberia haber cargado los productos en el gallery y se deberian haber guardado
        // en el localstorage
        try {
          parsed = stored ? JSON.parse(stored) : null;
          if (!Array.isArray(parsed) || parsed.length === 0) {
            parsed = null;
          }
        } catch {
          console.warn("no se puede leer correctamente LOCALSTORAGE, entonces lo borro para limpiar datos");
          localStorage.removeItem("products");
          parsed = null;
        }

        if (parsed) {
          console.log("✅ Productos cargados desde localStorage");
          setProducts(parsed);
          initQuantities(parsed);
          setLoading(false);
          return;
        }

        // 2. si no encontro los productos en el localstorage porq es accedio a /products directamente
        // o porque se borro el localstorga de manera manual.. .entonces ahi si ejecuto consulta a la base de datos
        console.log("🌐 Buscando productos en mongodb...");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const productsFromAPI = res.data.products;
        if (productsFromAPI && productsFromAPI.length > 0) {
          console.log(`✅ Productos cargados desde ${import.meta.env.VITE_API_URL}`);
          setProducts(productsFromAPI);
          localStorage.setItem("products", JSON.stringify(productsFromAPI));
          initQuantities(productsFromAPI);
          setLoading(false);
          return;
        }
        // 3. si hubo un problema con la conexion al a base de datos entonces uso mi fallback local
        console.warn("📦 Usando fallback local (ni localStorage ni API disponibles)");
        setProducts(localProducts);
        initQuantities(localProducts);
        setLoading(false);

      } catch (err) {
        console.error("❌ Error al obtener productos:", err);
        setError("Error al obtener productos");
        setLoading(false);
      }
    };

    const initQuantities = (products) => {
      const initial = {};
      products.forEach(p => initial[p.id] = 1);
      setQuantities(initial);
    };

    fetchProducts();
  }, []);

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1)
    }));
  };

  const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setSelectedProduct({ ...product, quantity });
    setIsAdded(true);
  };

  if (loading || fakeLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando productos, por favor espere...</p>
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <h3 className="products-title">TODOS NUESTROS PRODUCTOS ♥</h3>
      <div className="products-container">
        {products.map((product) => {
          const quantity = quantities[product.id] || 1;
          const total = product.price * quantity;

          return (
            <div key={product.id} className="product-card">
              <img
                src={product.img}
                alt={product.description}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-title">{product.description}</h3>
                <p className="product-price">${total}</p>

                <div className="quantity-controls">
                  <button className="addButton" onClick={() => decrement(product.id)}>-</button>
                  <input type="number" value={quantity} min="1" readOnly />
                  <button className="substractButton" onClick={() => increment(product.id)}>+</button>
                </div>

                <button
                  className="css-button-sliding-to-bottom--sky"
                  onClick={() => addToCart(product, quantity)}
                >
                  Añadir al carrito
                </button>
                <Link to={`/product/${product.id}`}>
                  <button className="css-button-sliding-to-bottom--sky">Ver detalle</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {isAdded && selectedProduct && (
        <div className="added-notification">
          <img src={selectedProduct.img} alt={selectedProduct.description} />
          <div>
            <p>{selectedProduct.description}</p>
            <p>Cantidad: {selectedProduct.quantity}</p>
            <p>Total: ${selectedProduct.quantity * selectedProduct.price}</p>
          </div>
          <button className="css-button-3d--sand" onClick={() => setIsAdded(false)}>Cerrar</button>
          <button className="css-button-3d--sand" onClick={() => navigate("/cart")}>Ir al carrito</button>
        </div>
      )}
    </>
  );
};

export default Productos;
