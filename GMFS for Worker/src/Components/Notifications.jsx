// src/Components/Notifications.jsx
import React from 'react';
import styles from "./Notifications.module.css"; // Use CSS modules

const Notifications = () => {
  return (
    <div className={styles.notifications}>
      <h2>Notifications</h2>
      {/* Example Notification Items */}
      <ul className={styles.notificationList}>
        <li className={styles.notificationItem}>New task assigned: Prepare the report.</li>
        <li className={styles.notificationItem}>Your shift starts in 1 hour.</li>
        <li className={styles.notificationItem}>Payment received: $500.</li>
      </ul>
    </div>
  );
};

export default Notifications;
