import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyNavbar() {
  return (
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
              <NavDropdown.Item as={Link} to="/action1">Search Order By ID And Mail</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action2">Search Order By Flight Number</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}