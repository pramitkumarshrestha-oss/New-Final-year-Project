// This is the Main page for the worker.
// import React from 'react';
// import WorkerDashboard from '../Components/WorkerDashboard';

// const WorkerHomePage = () => {
//   return (
//     <div>
//       <WorkerDashboard />
//     </div>
//   );
// };

// export default WorkerHomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaClock, FaBell, FaMoneyBill, FaEnvelope, FaUser } from 'react-icons/fa'; // Icons for different sections
import styles from './WorkerHomePage.module.css';

const WorkerHomePage = () => {
  return (
    <div className={styles.workerHome}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome, Worker!</h1>
        <p className={styles.subtitle}>Your performance and productivity are our priority.</p>
      </header>

      <div className={styles.dashboard}>
        <div className={styles.card}>
          <Link to="/tasks">
            <FaTasks className={styles.icon} />
            <h3>Task List</h3>
            <p>Manage your production tasks efficiently</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/messages">
            <FaEnvelope className={styles.icon} />
            <h3>Message</h3>
            <p>Please review ur Message</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/shifts">
            <FaClock className={styles.icon} />
            <h3>Shift Schedule</h3>
            <p>Track your upcoming and current shifts</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/performance">
            <FaUser className={styles.icon} />
            <h3>Performance Metrics</h3>
            <p>Review your task completion and quality</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/payments">
            <FaMoneyBill className={styles.icon} />
            <h3>Payment Overview</h3>
            <p>Check your earnings and payment status</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="/notifications">
            <FaBell className={styles.icon} />
            <h3>Notifications</h3>
            <p>Factory updates and announcements</p>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default WorkerHomePage;

