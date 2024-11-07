//The main component that consolidates all worker-related features

import React, { useContext } from 'react';
import { WorkerContext } from '../Contexts/WorkerContext';
import TaskList from './TaskList';
import ShiftSchedule from './ShiftSchedule';
import PerformanceMetrics from './PerformanceMetrics';
import PaymentHistory from './PaymentHistory';
import Messages from './Messages';
import Notifications from './Notifications';
import styles from './WorkerDashboard.module.css';

const WorkerDashboard = () => {
  const context = useContext(WorkerContext);

  if (!context) {
    return <div>Error: Context is not available</div>; // Fallback for better error handling
  }

  const { tasks, shiftSchedule, performance, paymentHistory, messages } = context;

  return (
    <div className={styles.dashboard}>
      <h1>Worker Dashboard</h1>
      <TaskList tasks={tasks} />
      <ShiftSchedule schedule={shiftSchedule} />
      <PerformanceMetrics performance={performance} />
      <PaymentHistory history={paymentHistory} />
      <Messages messages={messages} />
      <Notifications />
    </div>
  );
};

export default WorkerDashboard;
