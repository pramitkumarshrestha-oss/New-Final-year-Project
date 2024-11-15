import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/PaymentSuccess.module.css";

export const PaymentSuccess = () => {
  // const { setCartItems } = useContext(StoreContext);
  const { paymentDetails, setPaymentDetails } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem("paymentDetails");

    // Check if payment was successful
    if (storedPaymentDetails) {
      const paymentDetails = JSON.parse(storedPaymentDetails);

      if (paymentDetails.success) {
        // Reset cart items after payment
        setCartItems({});

        // Show success alert
        Swal.fire({
          title: "Payment Successful!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/"); // Redirect to home page after confirmation
          }
        });
      }
    }
  }, [navigate, setCartItems]);

  return (
    <div className={styles.main_container}>
      <button onClick={() => navigate("/")} className={styles.go_home_btn}>
        Go back to Home Page
      </button>
    </div>
  );
};
