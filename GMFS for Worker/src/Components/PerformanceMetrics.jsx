// src/Components/PerformanceMetrics.jsx
import React, { useContext, useEffect, useState } from "react";

import styles from "./PerformanceMetrics.module.css";
import axios from "axios";

const PerformanceMetrics = () => {
  const [workerData, setWorkerData] = useState();
  const [workerToken, setWorkerToken] = useState();
  const fetchWorkerData = async () => {
    try {
      const res = await axios.get("http://localhost:3010/api/workerDashboard", {
        headers: { Authorization: `Bearer ${workerToken}` },
      });

      setWorkerData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("workerToken");
    setWorkerToken(savedToken);
    if (workerToken) {
      fetchWorkerData();
    }
  }, [workerToken]);
  return (
    <div className={styles.performanceMetrics}>
      {workerData && (
        <>
          <h2 className={styles.title}>Performance Metrics</h2>
          <div className={styles.metricsContainer}>
            <div className={styles.metricCard}>
              <h3>Total Number of Works</h3>
              <p className={styles.metricValue}>
                {workerData.totalNumberOfWorks}
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>Total number of Completed Work</h3>
              <p className={styles.metricValue}>
                {workerData.totalNumberOfCompletedWorks}
              </p>
            </div>
            <div className={styles.metricCard}>
              <h3>Popularity</h3>
              <p className={styles.metricValue}>{workerData.popularity}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceMetrics;
