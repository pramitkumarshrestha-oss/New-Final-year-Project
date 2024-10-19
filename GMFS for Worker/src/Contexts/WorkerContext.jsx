// src/Contexts/WorkerContext.jsx
import React, { createContext, useState } from 'react';

export const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Stitch 50 shirts', deadline: '2024-10-20', status: 'Pending' },
    { id: 2, description: 'Check fabric inventory', deadline: '2024-10-22', status: 'In Progress' },
  ]);

  const [shiftSchedule, setShiftSchedule] = useState([
    { date: '2024-10-19', shift: 'Morning', start: '08:00 AM', end: '04:00 PM' },
    { date: '2024-10-20', shift: 'Evening', start: '02:00 PM', end: '10:00 PM' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Supervisor', content: 'Please complete the shirt stitching by tomorrow.', timestamp: '2024-10-18 09:30' },
  ]);

  const [performance, setPerformance] = useState({
    tasksCompleted: 45,
    punctuality: '95%',
    peerRating: 4.5,
  });

  const [paymentHistory, setPaymentHistory] = useState([
    { date: '2024-09-30', amount: '5000 NPR', method: 'Khalti', status: 'Paid' },
    { date: '2024-08-30', amount: '4800 NPR', method: 'Khalti', status: 'Paid' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned: Stitch 50 shirts', time: '2024-10-18' },
  ]);

  return (
    <WorkerContext.Provider value={{ tasks, setTasks, shiftSchedule, messages, performance, paymentHistory, notifications }}>
      {children}
    </WorkerContext.Provider>
  );
};
