import { useLocation } from 'react-router-dom';
import Navbar from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Rutas donde darkMode debe ser true y fixed false
  const darkModeRoutes = [
    '/cart',
    '/products',
    '/search',
    '/admin',
    '/login',
  ];

  // Para rutas dinámicas como /product/:id
  // detectamos si empieza con /product para aplicar darkmode true, fixed false
  const isProductDetail = path.startsWith('/product/');

  const isHomePage = path === '/';

  // fixed true solo en home
  const fixed = isHomePage;

  // darkMode true para estas rutas y product detail, false en home
  const darkMode = isHomePage ? false : darkModeRoutes.includes(path) || isProductDetail;

  return (
    <>
      <Navbar isFixed={fixed} darkMode={darkMode} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
