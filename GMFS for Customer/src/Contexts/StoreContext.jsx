import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Menu from "../Components/TabMenu/menu.jsx";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const token = localStorage.getItem("token");

  const [searchItem, setSearchItem] = useState(""); // Manage search term
  const [cartItems, setCartItems] = useState({});

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
>>>>>>> 449ddbbcac138013a8511d41418a386dec0de36d
    }
  };

  const cartItemCount = Object.values(cartItems).reduce((total, count) => total + count, 0);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = Menu.find((product) => product.id === parseInt(item));
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    Menu,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    searchItem, // Expose searchItem in context
    setSearchItem, // Expose setSearchItem in context
    cartItemCount,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
