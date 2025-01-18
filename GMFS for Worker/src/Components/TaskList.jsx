// src/Components/TaskList.jsx
import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      if (data.workers && data.workers[0].orders) {
        setTasks(data.workers[0].orders);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTaskStatus = async (orderId, newStatus, items = []) => {
    try {
      await axios.post("http://localhost:3010/api/updateOrder", {
        orderId,
        newStatus,
        items,
      });
      fetchTasks();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const submitModal = async (orderId, newStatus, items) => {
    try{
      await axios.post("http://localhost:3010/api/updateOrder", {
        orderId,
        newStatus,
        items,
      });
      fetchTasks();
      closeModal();
    }
    catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (task) => {
    setSelectedTask(task);
    // Initialize with completed items if they exist
    setSelectedItems(task.completedItems ? task.completedItems.map(item => item.name) : []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setSelectedItems([]);
    setIsModalOpen(false);
  };

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      // Prevent selecting all items
      if (selectedItems.length + 1 < selectedTask.orderedItems.length) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.orderId} className={styles.taskItem}>
            <p>Ordered Items: {task.orderedItems.map((item) => item.name).join(", ")}</p>
            <p>Total Amount: {task.totalAmount}</p>
            <p>Status: {task.orderStatus}</p>
            {task.orderStatus !== "Completed" && (
              <select
                value={task.orderStatus}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  if (newStatus === "Partially Completed") {
                    openModal(task);
                  } else {
                    updateTaskStatus(task.orderId, newStatus);
                  }
                }}
                className={styles.statusSelect}
              >
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
                    {task.orderedItems.length > 1 && (
                      <option value="Partially Completed">Partially Completed</option>
                    )}
                    <option value="Completed">Completed</option>
                  </>
                )}
              </select>
            )}
          </div>
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}

      {isModalOpen && selectedTask && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Items for Partial Completion</h3>
            <p className={styles.note}>Note: You cannot select all items</p>
            <div className={styles.itemList}>
              {selectedTask.orderedItems.map((item) => (
                <div key={item.name}>
                  <label>
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={() => handleItemSelect(item.name)}
                      checked={selectedItems.includes(item.name)}
                      disabled={!selectedItems.includes(item.name) && 
                               selectedItems.length + 1 >= selectedTask.orderedItems.length}
                    />
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => submitModal(selectedTask.orderId, "Partially Completed", selectedItems)}
              className={styles.submitButton}
              disabled={selectedItems.length === 0}
            >
              Submit
            </button>
            <button onClick={closeModal} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;