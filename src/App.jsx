import React, { useState, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider, ThemeContext } from './components/ThemeContext';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductCard from './components/ProductCard';
const PRODUCTS = [
  { id: 1, name: 'iPhone 16 pro max', price: 132900, image: 'https://www.imagineonline.store/cdn/shop/files/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__en-IN_6313d2b8-ef64-40f0-b60a-d77be47fd058.jpg?v=1727250893' },
  { id: 2, name: 'Samsung Galaxy S25 ultra', price: 117999, image: 'https://www.samsungmobilepress.com/file/9A8B0C5E7AE223941FE931B23B810EB4B0889FB378F9B1FA94096036C43DE1D9CBD04954550FBC1C771FCC793F100E9B5F5CA2F530F87B9FD4380D9EADEC2F54798273B45EB93A9033A5AD11EE2772F26A4BAD909A7CC2D855BCEDD00CD694A0D3D74A1A1DFD89AB23A207E29BB7C4FCB75408D09299E0D7A20B2E7C743E5C83BFD92E8F115E7A657CE4E9C368FF4F451E8D9FE7A63E4C776A67EDBF7A360A39' },
  { id: 3, name: 'Google Pixel 9 pro', price: 89999, image: 'https://www.designinfo.in/wp-content/uploads/2024/08/google-pixel-9proxl-rose-2-485x485-optimized.webp' },
  { id: 4, name: 'OnePlus 13', price: 69999, image: 'https://image01-in.oneplus.net/media/202412/17/052a246708df8233d079b3502aeeb327.png' },
  { id: 5, name: 'Titan Watch', price: 41999, image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwef1a0f86/images/Titan/Catalog/1688KM06_1.jpg?sw=360&sh=360' },
  { id: 6, name: 'Boat Headphone', price: 2999, image: 'https://www.boat-lifestyle.com/cdn/shop/files/ACCH3Y28FFJY6QRH_0.png?v=1737717888' },
  { id: 7, name: 'SmartWatch', price: 3999, image: 'https://images-cdn.ubuy.co.in/633e4dfa7c74db40b911ce66-agptek-lw11-smart-watch-for-women-with.jpg' },
  { id: 8, name: 'Airpods 2 pro', price: 24999, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836' },
  { id: 9, name: 'Gaming Keyboard', price: 3200, image: 'https://www.jiomart.com/images/product/original/rveojc9e9y/portronics-hydra-10-mechanical-gaming-keyboard-with-bluetooth-5-0-2-4-ghz-type-c-charging-white-product-images-orveojc9e9y-p600776875-0-202304211158.jpg?im=Resize=(420,420)' },
  { id: 10, name: 'Mouse', price: 4999, image: 'https://in-media.apjonlinecdn.com/catalog/product/6/N/6N0A9AA-2_T1698974626.png' },
];
function Starfield({ count = 120 }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2;
    return (
      <div
        key={i}
        className="star"
        style={{
          top: `${top}vh`,
          left: `${left}vw`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
  return <div className="starfield">{stars}</div>;
}
function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
function AppContent() {
  const [search, setSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  function handleLogin() {
    setIsAuthenticated(true);
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }
  function handleLike(productId) {
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }
  const likedProductObjs = PRODUCTS.filter(p => likedProducts.includes(p.id));
  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      {theme === 'dark' && <Starfield count={120} />}
      <div className="app-container">
        <nav>
          <span className="nav-logo">ShopVibe</span>
          <Link to="/" className="nav-home">Home</Link>
          <div className="nav-actions">
            {isAuthenticated && (
              <>
                <Link to="/" className="nav-login">Products</Link>
                <Link to="/checkout" className="nav-login">Checkout</Link>
              </>
            )}
            {isAuthenticated ? (
              <button className="nav-logout" onClick={() => {
                setIsAuthenticated(false);
                navigate('/');
              }}>Logout</button>
            ) : (
              <Link to="/login" className="nav-login">Login</Link>
            )}
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '🌙' : '☀️'} Theme
            </button>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Products</h1>
                <SearchBar className="search-bar" value={search} onChange={e => setSearch(e.target.value)} />
                <ProductList
                  products={PRODUCTS}
                  search={search}
                  isAuthenticated={isAuthenticated}
                  likedProducts={likedProducts}
                  onLike={handleLike}
                />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <div>
                  <h2>Checkout Page (Liked Products)</h2>
                  {likedProductObjs.length === 0 ? (
                    <p>No products liked yet.</p>
                  ) : (
                    <div className="product-list">
                      {likedProductObjs.map(product => (
                        <ProductCard
                          key={product.id}
                          name={product.name}
                          price={product.price}
                          image={product.image}
                          liked={true}
                          isAuthenticated={isAuthenticated}
                          onLike={() => handleLike(product.id)}
                          disableLike={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
export default App;