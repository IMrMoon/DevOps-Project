// frontend/src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'; // Import the new CSS


function Navbar() {
  const { user, signOut, isLoading, isValidating } = useContext(StoreContext);
  const navigate = useNavigate();

  // While loading/validating, you can show a spinner or skeleton here
  if (isLoading || isValidating) {
    return (
      <div className="navbar">
        <div className="nav-left">
          <img
            className="university-icon"
            src="/logo.png"
            alt="University Icon"
          />
        </div>
        <div className="nav-right">Loading...</div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <img
          className="university-icon"
          src="/logo.png"
          alt="University Icon"
        />
      </div>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/">Home</Link>
          {!user ? (
            <div className="nav-links">
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
              <Link to="/createlead">Leads Generation</Link>
            </div>
          ) : (
            <a onClick={signUserOut}>Sign out</a>
          )}
        </div>
        {user && <div className="user-circle">{userInitial}</div>}
      </div>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ backgroundImage: 'url(/background.png)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/flights" element={<FlightsPage />} />
            </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
