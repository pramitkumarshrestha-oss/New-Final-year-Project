import React from 'react';
import styles from '../Styles/Products.module.css';

const Products = () => {
  const products = [
    { id: 1, name: 'Printed Fabric', price: '$48.99', rating: 4.5 },
    { id: 2, name: 'Lace Fabric', price: '$49.99', rating: 5 },
    { id: 3, name: 'Silk Fabric', price: '$58.99', rating: 4.8 }
  ];

  return (
    <div className={styles.container}>
      <h1>Our Products</h1>
      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
