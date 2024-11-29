// Importing React and useContext hook for accessing context data.
import React, { useContext } from "react";

// Importing icons for add and remove functionalities.
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

// Importing CSS module for styling the cart component.
import styles from "../Styles/Cart.module.css";

// Importing StoreContext to access global state for cart functionalities.
import { StoreContext } from "../Contexts/StoreContext";

// Importing useNavigate hook for navigation.
import { useNavigate } from "react-router-dom";

// Cart Component definition
export const Cart = () => {
  // Destructuring variables and functions from StoreContext.
  const {
    cartItems,          // Object with product IDs as keys and quantities as values.
    setCartItems,       // Function to update the cart items.
    addToCart,          // Function to increment the quantity of a product.
    removeFromCart,     // Function to decrement the quantity of a product.
    Menu,               // Placeholder for additional menu data (not used here).
    getTotalCartAmount, // Function to calculate the total amount in the cart.
    cartData,           // Object holding the current cart data.
    setCartData,        // Function to update cartData.
    products,           // Array of product details.
  } = useContext(StoreContext);

  // Hook for navigating between pages.
  const navigate = useNavigate();

  // Boolean to check if the cart is empty.
  const isCartEmpty = Object.keys(cartItems).length === 0;

  // Function to handle the checkout process.
  const handleProceedOrder = async () => {
    // Preparing cart data for backend by transforming cartItems to include product details.
    const itemsInCart = Object.keys(cartItems).map((id) => {
      // Finding the product details for each item in the cart.
      const item = products.find((curItem) => curItem._id === id);
      console.log(item);

      return {
        id: item._id,                        // Product ID.
        name: item.name,                     // Product name.
        price: item.price,                   // Product price.
        quantity: cartItems[item._id],       // Quantity of the product in the cart.
        total: item.price * cartItems[item._id], // Total cost for this product.
      };
    });

    // Creating an object with order data, including total amount and delivery fee.
    const orderData = {
      items: itemsInCart,
      totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50),
      deliveryFee: getTotalCartAmount() === 0 ? 0 : 50, // Adding delivery fee if cart is not empty.
    };

    console.log(cartData);

    // Updating cartData in the context.
    setCartData(orderData);

    try {
      // Navigating to the "OrderPlaced" page.
      navigate("/OrderPlaced");
    } catch (err) {
      // Logging any errors that occur.
      console.log(err);
    }
  };

  // Function to remove a product entirely from the cart without decrementing.
  const handleremoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems }; // Create a copy of the current cart.
      delete updatedCart[id];              // Remove the product from the cart.
      return updatedCart;                  // Return the updated cart.
    });
  };

  return (
    <>
      {/* Main cart container */}
      <div className={styles.cart}>
        {/* Container for cart items */}
        <div className={styles.cart_items}>
          {/* Header row for cart item details */}
          <div className={styles.cart_items_title}>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />

          {/* List of products in the cart */}
          <ul>
            {products.map((curItem) => {
              // Render only products with quantity > 0 in the cart.
              if (cartItems[curItem._id] > 0)
                return (
                  <div key={curItem._id}>
                    <div className={`${styles.cart_items_item}`}>
                      {/* Product image */}
                      <img
                        src={"http://localhost:3010/" + curItem.image}
                        alt=""
                      />
                      {/* Product details */}
                      <p>{curItem.name}</p>
                      <p>Rs.{curItem.price}</p>
                      {/* Quantity controls */}
                      <div className={styles.item_counter_container}>
                        <CiCircleMinus
                          className={styles.sub_icon}
                          onClick={() => removeFromCart(curItem._id)} // Decrement quantity.
                        />
                        <p>{cartItems[curItem._id]}</p>
                        <IoIosAddCircleOutline
                          className={styles.add1_icon}
                          onClick={() => addToCart(curItem._id)} // Increment quantity.
                        />
                      </div>
                      {/* Total price for the product */}
                      <p>Rs.{curItem.price * cartItems[curItem._id]}</p>
                      {/* Remove product from cart */}
                      <p
                        className={styles.cross}
                        onClick={() => handleremoveFromCart(curItem._id)}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
            })}
          </ul>
        </div>

        {/* Cart total summary */}
        <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            <h2>Cart Totals</h2>
            {/* Subtotal */}
            <div className={styles.cart_total_details}>
              <p>Sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* Delivery fee */}
            <div className={styles.cart_total_details}>
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? "0" : 50}</p>
            </div>
            <hr />
            {/* Total amount */}
            <div className={styles.cart_total_details}>
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            {/* Proceed to checkout button */}
            <button
              type="submit"
              onClick={handleProceedOrder} // Trigger checkout process.
              disabled={isCartEmpty} // Disable button if cart is empty.
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
