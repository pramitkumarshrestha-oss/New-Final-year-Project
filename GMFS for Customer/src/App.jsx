import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Gallery from "./Components/TabMenu/Gallery";
import { Cart } from "./Pages/Cart";
import { OrderPlaced } from "./Pages/OrderPlaced";
import { AuthProvider } from "./Contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Gallery />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Landing/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
