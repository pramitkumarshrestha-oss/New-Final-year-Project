import React from "react";
import { Link } from "react-router-dom";
import styles from "./Help.module.css"; 

const Help = () => {
  return (
    <div className={styles.helpContainer}>
      <h1 className={styles.heading}>Help Center</h1>
      <p className={styles.intro}>
        Welcome to the Help Center! Here, you can find all the information you need to get started with the Garment Factory Management System.
      </p>

      <div className={styles.section}>
        <h2>Getting Started</h2>
        <p>Learn how to navigate through the system and set up your profile.</p>
        <Link to="/profile" className={styles.link}>Go to Profile Setup</Link>
      </div>

      <div className={styles.section}>
        <h2>Managing Tasks</h2>
        <p>Understand how to create, track, and manage tasks in your factory.</p>
        <Link to="/tasks" className={styles.link}>Go to Task Management</Link>
      </div>

      <div className={styles.section}>
        <h2>Attendance and Scheduling</h2>
        <p>Get details on how to track attendance and manage shift schedules for workers.</p>
        <Link to="/shifts" className={styles.link}>Go to Shift Schedule</Link>
      </div>

      <div className={styles.section}>
        <h2>Payment History</h2>
        <p>Learn how to view and manage payment history.</p>
        <Link to="/payments" className={styles.link}>Go to Payment History</Link>
      </div>

      <div className={styles.section}>
        <h2>Notifications</h2>
        <p>Stay up-to-date with notifications about tasks, shifts, and more.</p>
        <Link to="/notifications" className={styles.link}>Go to Notifications</Link>
      </div>

     
    </div>
  );
};

export default Help;
