import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/Orders.module.css";
import axios from "axios";
import { StoreContext } from "../Contexts/StoreContext";

const Orders = () => {
  const { token, setToken } = useContext(StoreContext);
  const [orders, setOrders] = useState();

  const fetchOrders = async () => {
    try {
      console.log(token);
      const response = await axios.get(
        "http://localhost:3010/customersOrder/customersOrder",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      console.log("radii");
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>
      <ul>
        {orders &&
          orders.map((order, index) => (
            <li key={order._id}>
              <p>{index + 1}</p>
              <p>{formatDate(order.createdAt)}</p>
              <p>
                {order.orderedItems.map((item, index) => {
                  return (
                    <h6 key={index}>
                      {item.name}-{item.quantity}
                    </h6>
                  );
                })}
              </p>
              <p>{order.orderStatus}</p>
              {/* {order.product} - {order.price} - {order.status} */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Orders;
