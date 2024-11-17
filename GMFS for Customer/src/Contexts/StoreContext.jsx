import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/TabMenu/menu.jsx";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(""); //khalti ko lagi ho yo

  useEffect(() => {
    // console.log(token);
    const savedToken = localStorage.getItem("token");
    console.log(savedToken);
    setToken(savedToken);
  }, [token]);

  const [searchItem, setSearchItem] = useState(""); // Manage search term
  const [cartItems, setCartItems] = useState({});

  useEffect(()=>{

    
    
    console.log(
      Object.keys(cartItems));
    
  },[])
  const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    deliveryFee: 50,
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Cart ko amount haru load garna
  const loadCartData = async (token) => {
    try {
      const response = await axios.get("http://localhost:3010/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("error Fetching cart data", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      loadCartData(savedToken); // Load cart data if token is available
    }
  }, [token]);


  // Adding cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        "http://localhost:3010/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  //Removing cart data
  const removeFromCart = async (itemId) => {
    
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      // updatedCart[itemId] += 1;
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] = updatedCart[itemId] - 1;
      }

      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
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

  const cartItemCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

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

  // const getTotalCartAmount = () => {
  //   return Object.keys(cartItems).reduce((total, id) => {
  //     const product = products.find((curItem) => curItem._id === id);
  //     // Only add to total if the product exists
  //     if (product) {
  //       return total + product.price * cartItems[id];
  //     } else {
  //       console.warn(`Product with ID ${id} not found in products array.`);
  //       return total;
  //     }
  //   }, 0);
  // };
  

  //Hamle products ko lagi data fetch garira ho from admin jun backend bata aairaxa
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3010/addProducts");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProducts();
    }
    loadData();
  }, [token]);

  const contextValue = {
    Menu,
    addToCart,
    removeFromCart,
    token,
    setToken,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    searchItem, // Expose searchItem in context
    setSearchItem, // Expose setSearchItem in context
    cartItemCount,
    setCartData,
    cartData,
    deliveryInfo,
    setDeliveryInfo,
    setProducts,
    products,  //Backend bata product haru like data tya bata taneko fetch gareko hai
    paymentDetails,
    setPaymentDetails,
    // loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
