import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';
import CustomNavbar from './components/CustomNavbar';
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
import Inventory from './components/inventory';
import Search from './components/search';
import Orders from './components/orders';
//
function App() {
  const auth = useAuth();

  return (
    <AuthProvider>
    <Router>
      <CustomNavbar />
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route index element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route index element={<Search />} />
          <Route path="search" element={<Search />} />

          <Route element={<ProtectedRoute />}>
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            </Route>

        </Routes>
      </div>


    </Router>
    </AuthProvider>
    


  );
}
//
export default App;