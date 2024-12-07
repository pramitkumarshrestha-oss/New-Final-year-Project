// src/Components/TaskList.jsx
import React, { useContext } from "react";
import { WorkerContext } from "../Contexts/WorkerContext";
import styles from "./TaskList.module.css"; // Use CSS modules

const TaskList = () => {
  const { tasks, setTasks } = useContext(WorkerContext);

  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status}</p>
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              className={styles.statusSelect}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskList;
