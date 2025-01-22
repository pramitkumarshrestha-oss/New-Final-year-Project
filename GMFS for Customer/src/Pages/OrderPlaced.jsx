import React, { useContext, useState } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/OrderPlaced.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OrderPlaced = () => {
  // Destructure setCartItems and getTotalCartAmount from StoreContext
  const {
    getTotalCartAmount,
    setCartItems,
    cartData,
    deliveryInfo,
    token,
    setDeliveryInfo,
  } = useContext(StoreContext);
  // console.log(deliveryInfo);
  const navigate = useNavigate(); // Initialize useNavigate

  //Validation garna ko lagi delivery information ko

  const [error, setError] = useState({});
  const validate = () => {
    let formErrors = {};
    if (!deliveryInfo.firstName.trim()) {
      formErrors.firstName = "First Name is Required *";
    } else if (!/[A-Za-z]+[A-Za-z]*/.test(deliveryInfo.firstName)) {
      formErrors.firstName = "Invalid first Name";
    }
    if (!deliveryInfo.lastName.trim()) {
      formErrors.lastName = "Last Name is Required *";
    } else if (!/[A-Za-z]+[A-Za-z]*/.test(deliveryInfo.lastName)) {
      formErrors.lastName = "Invalid last Name";
    }

    if (!deliveryInfo.email.trim()) {
      formErrors.email = "Email is Required *";
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        deliveryInfo.email
      )
    ) {
      formErrors.email = "Incorrect email format ";
    }

    if (!deliveryInfo.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is Required *";
    } else if (!/^[0-9]{10}$/.test(deliveryInfo.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone Number";
    }

    if (!deliveryInfo.address.trim()) {
      formErrors.address = "Address is Required *";
    }

    return formErrors;
  };

  const handleDeliveryInfo = (e) => {
    const { value, name } = e.target;
    setDeliveryInfo((preVal) => ({ ...preVal, [name]: value }));
    setError((prevErr) => ({ ...prevErr, [name]: "" }));
  };

  const handleProceedToPayment = async () => {
    const validation = validate();
    console.log(validation);

    console.log(Object.keys(validation).length);

    if (Object.keys(validation).length > 0) {
      setError(validation);
    } else {
      try {
        console.log("orderssss");
        console.log(cartData);

        const result = await axios.post(
          "http://localhost:3010/api/orderSchedule",
          { cartData, deliveryInfo },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      // try {
      //   // console.log(cartData);
      //   const res = await axios.post(
      //     "http://localhost:3010/api/khalti/init",
      //     { cartData, deliveryInfo },
      //     { headers: { Authorization: `Bearer ${token}` } }
      //   );
      //   const paymentUrl = await res.data.data.payment_url;
      //   // setPaymentDetails(response.data.data);
      //   localStorage.setItem("paymentDetails", JSON.stringify(res.data.data));
      //   console.log(paymentUrl);
      //   window.location.href = paymentUrl;
      //   // console.log(cartData);
      // } catch (error) {
      //   console.log(error);
      // }

      setCartItems([]);
      navigate("/Khaltidashboard");
    }
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
