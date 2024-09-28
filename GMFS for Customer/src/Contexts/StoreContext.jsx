import Menu from "../Components/TabMenu/menu.jsx";
import { createContext, useState, useContext } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  
  //For search Items
  const [searchItem, setSearchItem] = useState("");
  const handleSearchItem = (e) => {
    setSearchItem(e.target.value.toLowerCase());
  };

  //for cart items

  const [cartItems, setCartItems] = useState({});

  // const {isLoggedIn}=useAuth();//line added

  const addToCart = (itemId) => {
// if (!isLoggedIn) {  // Line 16: Check if user is logged in before adding to cart.
//       window.location.href = "/login";  // Line 17: Redirect to login if not logged in.
//       return;
//     }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    console.log(itemId);

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
