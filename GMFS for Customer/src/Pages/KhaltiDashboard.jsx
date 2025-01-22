import axios from "axios";
import { StoreContext } from "../Contexts/StoreContext";
import { useContext, useEffect, useState } from "react";
import styles from "../Styles/KhaltiDashboard.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Payment = () => {
  const navigate = useNavigate();

  const { cartData, deliveryInfo, setPaymentDetails, token } =
    useContext(StoreContext);
  const handlePayment = async () => {
    try {
      console.log(cartData);

      const response = await axios.post(
        "http://localhost:3010/api/khalti/init",
        {
          amount: cartData.totalAmount * 100,
          purchase_order_id: "test12",
          purchase_order_name: "test",
          customer_info: {
            name: `${deliveryInfo.firstName + " " + deliveryInfo.lastName}`,
            email: `${deliveryInfo.email}`,
            phone: `${deliveryInfo.phoneNumber}`,
          },
        }
      );
      console.log(response);
      const paymentUrl = await response.data.data.payment_url;
      console.log(paymentUrl);

      setPaymentDetails(response.data.data);
      localStorage.setItem(
        "paymentDetails",
        JSON.stringify(response.data.data)
      );
      window.location.href = paymentUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const showCodSuccessful = (message) => {
    Swal.fire({
      title: message,
      text: "Order has been placed successfully📃",
      icon: "success",
      confirmButtonText: "OK",
    }).then((Result) => {
      if (Result.isConfirmed) {
        navigate("/");
        window.location.reload();
      }
    });
  };

  const handleCodPayment = async () => {
    console.log("hello");

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        "http://localhost:3010/api/cod",
        {
          paymentMethod: "COD",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data.message);
      showCodSuccessful(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.payment_containers}>
      <div className={styles.payment_wrappers}>
        <h2 className={styles.subheadings}>
          Select your preferred payment method:
        </h2>
        <div className={styles.payment_options}>
          <div className={`${styles.options} `}>
            <img
              src="/images/Khalti.jpg"
              alt="Khalti"
              className={styles.payment_logos}
              onClick={handlePayment}
            />
            <p>Pay with Khalti</p>
          </div>

          <div className={`${styles.options} `}>
            <img
              src="/images/CashOnDelivery.png"
              alt="Khalti"
              className={styles.payment_logos}
              onClick={handleCodPayment}
            />
            <p>Cash on delivery</p>
          </div>
        </div>
      </div>

      <div className={styles.order_summarys}>
        <h3>Order Summary</h3>
        <div className={styles.total_amts}>
          <p>Total Amount</p>
          <p>Rs: {cartData.totalAmount}</p>
        </div>
      </div>
    </div>
  );
};
