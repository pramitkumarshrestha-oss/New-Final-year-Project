import React, { useContext, useState } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/OrderPlaced.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axios from "axios";

export const OrderPlaced = () => {
  // Destructure setCartItems and getTotalCartAmount from StoreContext
  const { getTotalCartAmount, setCartItems, cartData, deliveryInfo, token } =
    useContext(StoreContext);
  // console.log("sandesh");
  console.log(deliveryInfo);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProceedToPayment = () => {
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
            <div className={styles.firstName}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={deliveryInfo.firstName}
                required
                onChange={(e) => handleDeliveryInfo(e)}
              />
              {error.firstName && (
                <p className={styles.input_error}>{error.firstName}</p>
              )}
            </div>
            <div className={styles.lastName}>
              <input
                type="text"
                name="lastName"
                placeholder="Last  name"
                value={deliveryInfo.lastName}
                onChange={(e) => handleDeliveryInfo(e)}
              />
              {error.lastName && (
                <p className={styles.input_error}>{error.lastName}</p>
              )}
            </div>
          </div>
          <div className={styles.email}>
            <input
              type="email"
              name="email"
              onChange={(e) => handleDeliveryInfo(e)}
              placeholder="Email address"
            />
            {error.email && <p className={styles.input_error}>{error.email}</p>}
          </div>
          <div className={styles.phnNumber}>
            <input
              type="text"
              name="phoneNumber"
              onChange={(e) => handleDeliveryInfo(e)}
              placeholder="Phone Number"
            />
            {error.phoneNumber && (
              <p className={styles.input_error}>{error.phoneNumber}</p>
            )}
          </div>

          <div className={styles.address}>
            <input
              type="text"
              name="address"
              onChange={handleDeliveryInfo}
              placeholder="Delivery Address"
            />
            {error.address && (
              <p className={styles.input_error}>{error.address}</p>
            )}
          </div>
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
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button type="submit" onClick={handleProceedToPayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
