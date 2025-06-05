// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import Cart from './components/Cart';
// import SearchResults from './components/SearchResult';
// import Products from './components/pages/Products';
// import ProductDetail from './components/pages/productDetail';
// import Login from './components/pages/Login';
// import Admin from './components/pages/Admin';
// import RutasProtegidas from './components/RutasProtegidas';
// import { AuthProvider } from './components/AuthContext';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/search" element={<SearchResults />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/admin"
//         element={
//           <RutasProtegidas>
//             <Admin />
//           </RutasProtegidas>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Cart from './components/Cart';
import SearchResults from './components/SearchResult';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/productDetail';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import RutasProtegidas from './components/RutasProtegidas';
import { CartProvider } from '../src/context/CartContext';
import Layout from './components/Layout';

function App() {
  return (
    <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RutasProtegidas>
                  <Admin />
                </RutasProtegidas>
              }
            />
          </Route>
        </Routes>
    </CartProvider>
  );
}

export default App;
