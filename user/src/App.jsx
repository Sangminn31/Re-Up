import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';


import Home from './components/home';
import Login from './components/Login';
import SignUp from './components/signup';
//
function App() {


  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Re-Up</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/deliverytime">Delivery Time</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/search">search</Nav.Link>
            </Nav>
            <Nav className="mr-4">
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route index element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>


    </Router>
    


  );
}
//
export default App;