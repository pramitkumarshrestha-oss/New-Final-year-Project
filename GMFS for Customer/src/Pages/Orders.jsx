import React from 'react';
import styles from '../Styles/Orders.module.css';

const Orders = () => {
  const orders = [
    { id: 1, product: 'Printed Fabric', status: 'Completed', price: '$48.99' },
    { id: 2, product: 'Lace Fabric', status: 'Completed', price: '$49.99' },
  ];

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.product} - {order.price} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
