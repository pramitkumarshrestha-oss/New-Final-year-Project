import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext"; // Import the context
import { useAuth } from "../Contexts/AuthContext"; // Import AuthContext
import styles from "../Styles/ProductPage.module.css"; // Import CSS module

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Access context functions
  const { addToCart, products } = useContext(StoreContext); 
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate(); 

  // Fetch product from the menu based on the ID
  useEffect(() => {
    const fetchedProduct = products.find((item) => item._id === id); // Use products from context

    setProduct(fetchedProduct);
  }, [id, products]); 

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      
      navigate("/login");
    } else {
     
      addToCart(id);
    }
  };

  if (!product) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>{product.name}</h2>
      <div className={styles.productDetails}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <p className={styles.productDescription}>{product.description}</p>
        <p>Price: Rs {new Intl.NumberFormat().format(products.price)}</p>{" "}
      </div>

      <button className={styles.btnPrimary} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
