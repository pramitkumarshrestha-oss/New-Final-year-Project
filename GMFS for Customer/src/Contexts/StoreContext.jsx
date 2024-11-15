import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Menu from "../Components/TabMenu/menu.jsx";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [paymentDetails,setPaymentDetails]=useState("");//khalti ko lagi ho yo

  useEffect(() => {
    // console.log(token);
    const savedToken = localStorage.getItem("token");
    console.log(savedToken);
    setToken(savedToken);
  }, [token]);

  const [searchItem, setSearchItem] = useState(""); // Manage search term
  const [cartItems, setCartItems] = useState({});
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
  // const loadCartData= async (token)=>{
  //   try{
  //     const response = await axios.post(
  //       "http://localhost:3010/cart/get",
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setCartItems(response.data.cartData);
  //     }
  //     catch(error){
  //       console.error("error Fetching cart data",error);
  //     }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const savedToken = localStorage.getItem("token");
  //     setToken(savedToken);
  //     loadCartData(savedToken); // Load cart data if token is available
  //   }
  // }, [token]);

  // Adding cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      console.log(token);
      await axios.post(
        "http://localhost:3010/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const { [itemId]: _, ...remainingItems } = cartItems;
      setCartItems(remainingItems);
    }

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
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        console.log(itemInfo);

        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

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
    products,
    paymentDetails,
    setPaymentDetails
    // loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
