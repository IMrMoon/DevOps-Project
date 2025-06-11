import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import { StoreProvider } from './store/StoreContext.jsx';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            alt="Flights icon"
            className="flights-icon"
            style={{ height: 60 }}
          />
        </Navbar.Brand>
        <NavDropdown title="Search Order" id="basic-nav-dropdown" align="end">
          <NavDropdown.Item as={Link} to="/action1">Search Order By ID And Mail</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/action2">Search Order By Flight Number</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <MyNavbar />
        <div style={{ backgroundImage: 'url(/background.png)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights" element={<FlightsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;