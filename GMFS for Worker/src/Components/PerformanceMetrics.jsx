// src/Components/PerformanceMetrics.jsx
import React, { useContext } from 'react';
import { WorkerContext } from '../Contexts/WorkerContext';
import styles from './PerformanceMetrics.module.css'; // Use CSS modules

const PerformanceMetrics = () => {
  const { performance } = useContext(WorkerContext);

  return (
    <div className={styles.performanceMetrics}>
      <h2 className={styles.title}>Performance Metrics</h2>
      <div className={styles.metricsContainer}>
        <div className={styles.metricCard}>
          <h3>Tasks Completed</h3>
          <p className={styles.metricValue}>{performance.tasksCompleted}</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Punctuality</h3>
          <p className={styles.metricValue}>{performance.punctuality}</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Peer Rating</h3>
          <p className={styles.metricValue}>{performance.peerRating}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
