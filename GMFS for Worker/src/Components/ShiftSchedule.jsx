// src/Components/ShiftSchedule.jsx
import React, { useContext } from 'react';
import { WorkerContext } from '../Contexts/WorkerContext';
import styles from './ShiftSchedule.module.css'; // Use CSS modules

const ShiftSchedule = () => {
  const { shiftSchedule } = useContext(WorkerContext);

  return (
    <div className={styles.shiftSchedule}>
      <h2 className={styles.title}>Shift Schedule</h2>
      {shiftSchedule.length > 0 ? (
        shiftSchedule.map((shift, index) => (
          <div key={index} className={styles.shiftItem}>
            <p><strong>{shift.date} - {shift.shift}</strong></p>
            <p>Start: {shift.start}</p>
            <p>End: {shift.end}</p>
          </div>
        ))
      ) : (
        <p>No shifts scheduled.</p>
      )}
    </div>
  );
};

export default ShiftSchedule;
