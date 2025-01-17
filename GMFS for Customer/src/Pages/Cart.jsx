
import React, { useContext , useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import styles from "../Styles/Cart.module.css";
import { StoreContext } from "../Contexts/StoreContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  // Destructuring variables and functions from StoreContext.
  const {
    cartItems,          
    setCartItems,       
    addToCart,          
    removeFromCart,                 
    getTotalCartAmount,
    cartData,           
    setCartData,       
    products,           
  } = useContext(StoreContext);

  const navigate = useNavigate();
  
  const isCartEmpty = Object.keys(cartItems).length === 0;

  const [selectedSizes, setSelectedSizes] = useState({});
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [productId]: size }));//changes gareko yaha
  };

  // Function to handle the checkout process.
  const handleProceedOrder = async () => {
    // Preparing cart data for backend by transforming cartItems to include product details.
    const itemsInCart = Object.keys(cartItems).map((id) => {
      
      const item = products.find((curItem) => curItem._id === id);
      console.log(item);

      return {
        id: item._id,                        
        name: item.name,                    
        price: item.price,                   
        quantity: cartItems[item._id],      
        total: item.price * cartItems[item._id], 
        size: selectedSizes[item._id] || "N/A",//yaha changes gareko
      };
    });

    // Creating an object with order data, including total amount and delivery fee.
    const orderData = {
      items: itemsInCart,
      totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50),
      deliveryFee: getTotalCartAmount() === 0 ? 0 : 50, // Adding delivery fee if cart is not empty.
    };

    setCartData(orderData);
    try {
   
      navigate("/OrderPlaced");
    } catch (err) {
     
      console.log(err);
    }
  };

  // Function to remove a product entirely from the cart without decrementing.
  const handleremoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems }; 
      delete updatedCart[id];              
      return updatedCart;                  
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

                    <div className={styles.size_selector}>
                      <p>Size:</p>
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          className={`${styles.size_button} ${
                            selectedSizes[curItem._id] === size ? styles.selected : ""
                          }`}
                          onClick={() => handleSizeSelect(curItem._id, size)}
                        >
                          {size}
                        </button>
                      ))}
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
