import axios from "axios";
import { StoreContext } from "../Contexts/StoreContext";
import { useContext, useEffect } from "react";
import styles from "../Styles/KhaltiDashboard.module.css";

export const Payment = () => {
  const { cartData, deliveryInfo, setPaymentDetails } =
    useContext(StoreContext);
  const handlePayment = async () => {
    try {
      console.log(cartData.totalAmount);

      const response = await axios.post(
        "url kazi le dincha",
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
      const paymentUrl = await response.data.data.payment_url;
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

  const handleCodPayment = () => {};
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
