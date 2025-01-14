import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Gallery from "./Components/TabMenu/Gallery";
import { Cart } from "./Pages/Cart";
import { OrderPlaced } from "./Pages/OrderPlaced";
import { AuthProvider } from "./Contexts/AuthContext";
import { PaymentSuccess } from "./Pages/PaymentSuccess";
import { Payment } from "./Pages/KhaltiDashboard";
// import ProductPage from "./Pages/ProductPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Gallery />} />
          {/* <Route path="/product/:id" element={<ProductPage />} />{" "} */}
          {/* Route for product details */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route path="/Khaltidashboard" element={<Payment />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
