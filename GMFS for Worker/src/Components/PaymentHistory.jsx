// Shows the payment history of the worker.
// Shows the payment history of the worker.
// src/Components/PaymentHistory.jsx
import React, { useContext } from 'react';
import { WorkerContext } from '../Contexts/WorkerContext';
import styles from './PaymentHistory.module.css'; // Use CSS Modules for styles

const PaymentHistory = () => {
  const { paymentHistory } = useContext(WorkerContext);

  return (
    <div className={styles.paymentHistory}>
      <h2 className={styles.heading}>Payment History</h2>
      <div className={styles.paymentList}>
        {paymentHistory.length > 0 ? (
          paymentHistory.map((payment, index) => (
            <div key={index} className={styles.paymentItem}>
              <p><strong>Date:</strong> {payment.date}</p>
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Method:</strong> {payment.method}</p>
              <p><strong>Status:</strong> {payment.status}</p>
            </div>
          ))
        ) : (
          <p>No payment records found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

