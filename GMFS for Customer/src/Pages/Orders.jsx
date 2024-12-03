import React, { useEffect, useState } from 'react';
import styles from '../Styles/Orders.module.css';

const Orders = () => {
  console.log("hello");
  const [orders,setOrders]=useState();
  const fetchOrders=async ()=>{
 console.log("hello");
 
  try{

    const response = await axios.get("http://localhost:3010/customersOrder/customersOrder", 
      {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    setOrders(response.data);
    
  }
  catch(error){
   
  console.log(error);

  }
}

 
  useEffect(()=>{
    fetchOrders();

  },[])

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
