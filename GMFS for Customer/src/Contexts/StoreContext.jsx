import axios from "axios";
import Menu from "../Components/TabMenu/menu.jsx";
import { createContext, useState, useContext } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  // const [token, setToken] = useState("");
  const token = localStorage.getItem("token");
  //For search Items
  const [searchItem, setSearchItem] = useState("");
  const handleSearchItem = (e) => {
    setSearchItem(e.target.value.toLowerCase());
  };

  //for cart items

  const [cartItems, setCartItems] = useState({});

  // const {isLoggedIn}=useAuth();//line added

  const addToCart = async (itemId) => {
    // if (!isLoggedIn) {  // Line 16: Check if user is logged in before adding to cart.
    //       window.location.href = "/login";  // Line 17: Redirect to login if not logged in.
    //       return;
    //     }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // try {
    //   console.log("Sandesh");
    //   await axios.post("http://localhost:3010/cart/add", { itemId });
    // } catch (error) {
    //   console.log(error);
    // }

    if (token) {
      // console.log(token);
      await axios.post(
        "http://localhost:3010/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  //remove cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        "http://localhost:3010/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Calculate total number of items in cart
  const cartItemCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

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
    searchItem,
    setSearchItem,
    handleSearchItem,
    cartItemCount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
