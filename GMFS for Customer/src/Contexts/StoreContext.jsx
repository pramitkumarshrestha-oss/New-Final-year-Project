// Importing necessary libraries and components.
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/TabMenu/menu.jsx";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");

  const [paymentDetails, setPaymentDetails] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if(savedToken)
    {
      setToken(savedToken);
    }
 
  
  }, [token]);

  // Search term state for managing search input.
  const [searchItem, setSearchItem] = useState("");
  const [cartItems, setCartItems] = useState({});

  // Debugging cartItems state on mount.
  useEffect(() => {
    // console.log(Object.keys(cartItems));
  }, []);

  // State for cart data including items, total amount, and delivery fee.
  const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    deliveryFee: 50,
  });

  // State for storing delivery information for an order.
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Function to load cart data from the backend if a token exists.
  const loadCartData = async (token) => {
    try {
      const response = await axios.get("http://localhost:3010/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cartData); // Update cart items with data from the backend.
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  // Load cart data when the token changes.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken); // Set the token in state.
      loadCartData(savedToken); // Fetch and set cart data.
    }
  }, [token]);

  // Function to add an item to the cart.
  const addToCart = async (itemId) => {
    // Update cart items state to increment quantity or add a new item.
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // Send the updated cart data to the backend if a token is present.
    if (token) {
      await axios.post(
        "http://localhost:3010/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  // Function to remove or decrement an item from the cart.
  const removeFromCart = async (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      if (updatedCart[itemId] > 1) {
        // Decrement quantity if greater than 1.
        updatedCart[itemId] -= 1;
      } else {
        // Remove item from cart if quantity is 1.
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    // Update the backend about the removed item.
    if (token) {
      try {
        await axios.post(
          "http://localhost:3010/cart/remove",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log("Error removing item from cart:", error);
      }
    }
  };

  // Calculate the total number of items in the cart.
  const cartItemCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

  // Function to calculate the total cart amount based on item prices and quantities.
  const getTotalCartAmount = () => {
    console.log(cartItems);

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        console.log(itemInfo);

        totalAmount += itemInfo.price * cartItems[item];
        console.log(totalAmount);
      }
    }
    return totalAmount;
  };

  // State to store products fetched from the backend.
  const [products, setProducts] = useState([]);

  // Function to fetch products data from the backend.
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3010/addProducts");
      setProducts(response.data); // Update products state with fetched data.
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch products on component mount or when the token changes.
  useEffect(() => {
    async function loadData() {
      await fetchProducts();
    }
    loadData();
  }, [token]);

  // Context value to provide global state and actions to child components.
  const contextValue = {
    Menu, // Menu component or data.
    addToCart, // Function to add items to the cart.
    removeFromCart, // Function to remove items from the cart.
    token, // User authentication token.
    setToken, // Function to update token.
    cartItems, // State for cart items.
    setCartItems, // Function to update cart items.
    getTotalCartAmount, // Function to calculate cart total.
    searchItem, // Search term state.
    setSearchItem, // Function to update search term.
    cartItemCount, // Total number of items in the cart.
    setCartData, // Function to update cart data.
    cartData, // Cart data state.
    deliveryInfo, // Delivery information state.
    setDeliveryInfo, // Function to update delivery information.
    setProducts, // Function to update products.
    products, // List of available products.
    paymentDetails, // Payment details state.
    setPaymentDetails, // Function to update payment details.
  };

  return (
    // Providing context value to all child components.
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context easily.
export const useStore = () => useContext(StoreContext);
