// src/Components/TaskList.jsx
import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("workerToken");
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3010/fetchWorks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.workers && data.workers[0].orders) {
        setTasks(data.workers[0].orders);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (orderId, newStatus) => {
    // const updatedTasks = tasks.map((task) =>
    //   task.orderId === orderId ? { ...task, orderStatus: newStatus } : task
    // );

    // setTasks(updatedTasks);
    try {
      const res = await axios.post("http://localhost:3010/api/updateOrder", {
        orderId,
        newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.orderId} className={styles.taskItem}>
            <p>Ordered Item: {task.orderedItems[0].name}</p>
            <p>Total Amount: {task.totalAmount}</p>
            <p>Status: {task.orderStatus}</p>
            {task.orderStatus !== "Completed" && (
              <select
                value={task.orderStatus}
                onChange={(e) => updateTaskStatus(task.orderId, e.target.value)}
                className={styles.statusSelect}
              >
                {console.log(task.orderStatus)}

                {task.orderStatus === "processedWithPayment" && (
                  <>
                    <option value="processedWithPayment" disabled>
                      Processed with Payment
                    </option>
                    <option value="inProgress">In Progress</option>
                  </>
                )}
                {task.orderStatus === "inProgress" && (
                  <>
                    <option value="inProgress" disabled>
                      In Progress
                    </option>
                    <option value="Completed">Completed</option>
                  </>
                )}

                {/* <option value="Completed">Completed</option> */}
              </select>
            )}
          </div>
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskList;
