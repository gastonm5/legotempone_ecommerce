// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import Cart from './components/Cart'
// import SearchResults from './components/SearchResult';
// import Products from './components/pages/Products';
// import ProductDetail from './components/pages/productDetail';
// // import About from './pages/About';
// // import Contact from './pages/Contact';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/search" element={<SearchResults />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         {/* <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} /> */}
//       </Routes>
//     </Router>
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
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
