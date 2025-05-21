import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../src/styles/gallery.css";

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("products");

    if (stored) {
      const parsed = JSON.parse(stored);
      setProducts(parsed);
      const initialQuantities = {};
      parsed.forEach(p => initialQuantities[p.id] = 1);
      setQuantities(initialQuantities);
    } else {
      axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
          const { source, products } = res.data;
          setProducts(products);
          localStorage.setItem("products", JSON.stringify(products));
          const initialQuantities = {};
          products.forEach(p => initialQuantities[p.id] = 1);
          setQuantities(initialQuantities);
        })
        .catch((err) => {
          console.error("Error al obtener productos", err);
        });
    }
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
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setSelectedProduct({ ...product, quantity });
    setIsAdded(true);
  };

  return (
    <>
    <div className="galleryTitle">
      <h2>Mira todos los productos que tenemos para vos ♡</h2>
    </div>
    <div className="gallery-container">
      {products.map((product) => {
        const quantity = quantities[product.id] || 1;
        const totalPrice = product.price * quantity;

        return (     
          <div className="product-card" key={product.id}>
            <img
              src={product.img}
              alt={product.description}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-title">{product.description}</h3>
              <p className="product-price">${totalPrice}</p>

              <div className="quantity-controls">
                <button className='addButton' onClick={() => decrement(product.id)}>-</button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  readOnly
                />
                <button className='substractButton' onClick={() => increment(product.id)}>+</button>
              </div>

              <button className='css-button-sliding-to-bottom--sky' onClick={() => addToCart(product, quantity)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        );
      })}

      {isAdded && selectedProduct && (
        <div className="added-notification">
          <img src={selectedProduct.img} alt={selectedProduct.description} />
          <div>
            <p>{selectedProduct.description}</p>
            <p>Cantidad: {selectedProduct.quantity}</p>
            <p>Total: ${selectedProduct.quantity * selectedProduct.price}</p>
          </div>
          <button onClick={() => setIsAdded(false)}>Cerrar</button>
          <button onClick={() => window.location.href = "/cart"}>Ir al carrito</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Gallery;
