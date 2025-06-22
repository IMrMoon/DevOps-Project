// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import SearchResultsPage from './pages/SearchResultsPage.jsx';

function MyNavbar() {
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState(''); // 'id' or 'flight'
  const [formData, setFormData] = useState({ id: '', email: '', flightNumber: '' });
  const navigate = useNavigate();


  const handleOpen = (type) => {
    setSearchType(type);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ id: '', email: '', flightNumber: '' });
  };

  const handleSearch = () => {
    setShowModal(false);
    if (searchType === 'id') {
      navigate(`/search-id?Id=${formData.id}&email=${formData.email}`);
    } else {
      navigate(`/search-flight-number?flight=${formData.flightNumber}`);
    }
  };




  return (
    <>
      <Navbar bg="dark" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo.png"
              alt="Flights icon"
              style={{ height: 60 }}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Search Order" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => handleOpen('id')}>
                  Search Order By ID And Mail
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleOpen('flight')}>
                  Search Order By Flight Number
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {searchType === 'id' ? 'Search by ID and Email' : 'Search by Flight Number'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {searchType === 'id' ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.flightNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, flightNumber: e.target.value })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <div style={{ backgroundImage: 'url(/background.png)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/search-id" element={<SearchResultsPage />} />
          <Route path="/search-flight-number" element={<SearchResultsPage />} />
          {/* תוסיף כאן את שאר הדפים בעתיד */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
