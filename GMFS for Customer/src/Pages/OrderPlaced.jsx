import React, { useContext } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/OrderPlaced.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OrderPlaced = () => {
  // Destructure setCartItems and getTotalCartAmount from StoreContext
  const { getTotalCartAmount, setCartItems, cartData, deliveryInfo, token } =
    useContext(StoreContext);
  // console.log("sandesh");
  console.log(deliveryInfo);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProceedToPayment = async () => {
    try {
      console.log(token);
      await axios.post(
        "http://localhost:3010/api/orderSchedule/",
        { cartData, deliveryInfo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(cartData);
    } catch (error) {
      console.log(error);
    }
    // Store payment details in localStorage (you can store order-related information)
    localStorage.setItem("paymentDetails", JSON.stringify({ success: true }));

    // Navigate to the PaymentSuccess page
    navigate("/payment-success");

    // Reset the cart after payment
    setCartItems({});
  };

  return (
    <div className={styles.place_order_container}>
      <div className={styles.place_order_left}>
        <form className={styles.place_order_form}>
          <h2>Delivery Information</h2>
          <div className={styles.multi_fields}>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Delivery Location" />
        </form>
      </div>

      <div className={styles.place_order_right}>
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
              <p>Rs.{50}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p>Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button type="button" onClick={handleProceedToPayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
