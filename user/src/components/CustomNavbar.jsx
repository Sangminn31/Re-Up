// CustomNavbar.jsx
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useAuth } from './AuthContext'; // Adjust the import path as needed

const CustomNavbar = () => {
  const auth = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">Re-Up</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/deliverytime">Delivery Time</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            {!auth.isLoggedIn ? (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            ) : (
              <Nav.Link onClick={() => auth.logout()}>Logout</Nav.Link>
            )}
            {!auth.isLoggedIn && (
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;