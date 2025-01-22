import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/PaymentSuccess.module.css";
import axios from "axios";

export const PaymentSuccess = () => {
  const { paymentDetails, setPaymentDetails } = useContext(StoreContext);

  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem("paymentDetails");
    const parsed = JSON.parse(storedPaymentDetails);
    const { pidx } = parsed;
    getVerified(pidx);
    if (!paymentDetails && storedPaymentDetails) {
      setPaymentDetails(JSON.parse(storedPaymentDetails));
    }
    console.log(paymentDetails);
  }, [paymentDetails, setPaymentDetails]);
  const getVerified = async (pidx) => {
    try {
      const token = localStorage.getItem("token");
      const tryK = await axios.post(
        "http://localhost:3010/api/khaltiVerify",
        { pidx },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(tryK);
      if (tryK && tryK.data.status === "Completed") {
        showPaymentSuccessful();
      } else {
        showPaymentTerminated();
      }
      console.log(tryK);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const showPaymentTerminated = () => {
    Swal.fire({
      title: "Payment Canceled!",
      text: "Your order has been terminated.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const showPaymentSuccessful = () => {
    Swal.fire({
      title: "Your Payment Is Successfully Received🫰",
      text: "Order has been placed successfully📃",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <button onClick={handleNavigate} className={styles.go_home_btn}>
        Go back to Home Page
      </button>
    </div>
  );
};
