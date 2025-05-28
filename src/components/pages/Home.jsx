import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';
import Popup from '../../components/Popup'; 

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const requisitosCumplidos = (
    <ul style={{ textAlign: 'left' }}>
      <li>Implementacion de rutas protegidas con React Router. /login y /admin</li>
      <li>Navbar y Footer en todas las paginas. (falta crear un cartprovider con un layout que envuelva navbar y footer)</li>
      <li>Carrito de compras basico y funcional.</li>
      <li>Conexión con backend API (mongodb) y manejo de estado.</li>
      <li>Manejo de estados de carga, Loading o Spinner creado en la pagina de Productos (componente products)</li>
      <li>Configuracion de rutas con react-router-dom</li>
      <li>Creacion de ProductDetails (detalle de los products a traves del id)</li>
      <li>Uso de localstorage</li>
      <li>App Responsive</li>
      <li>Deploy realizado en Render</li>
      <li>Me falta crear la edicion de productos en el panel de administracion</li>
      <li>Me falta crear las paginas About y Contacto</li>
      <li>Me falta cambiar y/o agregar algunos estilos</li>
      <li>El footer por el momento no tiene interaccion</li>
    </ul>
  );

  return (
    <>
      {showPopup && 
        <Popup 
          message={requisitosCumplidos} 
          onClose={() => setShowPopup(false)} 
        />
      }
      <Nav />
      <Header />
      <Main />
      <Gallery />
      <Footer />
    </>
  );
};

export default Home;
