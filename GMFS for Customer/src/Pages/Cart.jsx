import React, { useContext } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import styles from "../Styles/Cart.module.css";
import { StoreContext } from "../Contexts/StoreContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    Menu,
    getTotalCartAmount,
  
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const isCartEmpty = Object.keys(cartItems).length === 0;
  const handleProceedOrder = () => {
    navigate("/orderplaced");
  };
  //To remove the cart without decrementing the item.
  const handleremoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[id];
      return updatedCart;
    });
  };
  return (
    <>
      <div className={styles.cart}>
        <div className={styles.cart_items}>
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

          <ul>
            {Menu.map((curItem) => {
              if (cartItems[curItem.id] > 0)
                return (
                  <div key={curItem.id}>
                    <div className={`${styles.cart_items_item}`}>
                      <img src={curItem.image} alt="" />
                      <p>{curItem.name}</p>
                      <p>Rs.{curItem.price}</p>
                      <div className={styles.item_counter_container}>
                        <CiCircleMinus
                          className={styles.sub_icon}
                          onClick={() => removeFromCart(curItem.id)}
                        />
                        <p>{cartItems[curItem.id]}</p>
                        <IoIosAddCircleOutline
                          className={styles.add1_icon}
                          onClick={() => addToCart(curItem.id)}
                        />
                      </div>
                      <p>Rs.{curItem.price * cartItems[curItem.id]}</p>

                      <p
                        className={styles.cross}
                        onClick={() => handleremoveFromCart(curItem.id)}
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
        {/* showing Cart total details */}
        <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            <h2>Cart Totals</h2>
            <div className={styles.cart_total_details}>
              <p>Sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? "0" : 50}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button
              type="submit"
              onClick={handleProceedOrder}
              disabled={isCartEmpty}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
