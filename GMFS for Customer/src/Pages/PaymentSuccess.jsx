import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext";
import styles from "../Styles/PaymentSuccess.module.css";

//Function declare garera setCartItems lai
// destructure gareko kinaki access garna lai from storecontext bata ,
//reset cart haru garna useful hos vanera
export const PaymentSuccess = () => {
  const { setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  //Retrieve garna use huncha payment haru
  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem("paymentDetails");

    //yesle lai payment vhako cha ki nai check garxa if vhako cha vane chai cart lai reset garera empty banaidincha
    if (storedPaymentDetails) {
      setCartItems({});
      //popharu dekhaune if payment vhayo vhane
      Swal.fire({
        title: "Payment Successful!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
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
