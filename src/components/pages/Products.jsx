import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Nav";
import Footer from "../Footer";
import '../../styles/products.css';
import '../../styles/productDetail.css';
import { Link } from "react-router-dom";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const stored = localStorage.getItem("products");
        if (stored) {
          const parsed = JSON.parse(stored);
          setProducts(parsed);
          initQuantities(parsed);
          setLoading(false);
        } else {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
          const productsFromAPI = res.data.products;
          setProducts(productsFromAPI);
          localStorage.setItem("products", JSON.stringify(productsFromAPI));
          initQuantities(productsFromAPI);
          setLoading(false);
        }
      } catch (err) {
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setSelectedProduct({ ...product, quantity });
    setIsAdded(true);
  };

  if (fakeLoading) {
    return (
      <>
        <Navbar isFixed={false} darkMode={true} />
        <div className="spinner-container">
          <div className="spinner"></div>
          <p className="loading-text">Cargando productos, por favor espere...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (loading) return <p className="loading-message">Cargando productos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <Navbar isFixed={false} darkMode={true} />
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
          <button className="css-button-3d--sand" onClick={() => window.location.href = "/cart"}>Ir al carrito</button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Productos;
