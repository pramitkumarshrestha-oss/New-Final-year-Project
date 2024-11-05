// Handles worker communication, displaying messages from supervisors.
// src/Components/Messages.jsx
import React, { useContext } from 'react';
import { WorkerContext } from '../Contexts/WorkerContext';
import styles from './Messages.module.css'; // Use CSS modules

const Messages = () => {
  const { messages } = useContext(WorkerContext);

  return (
    <div className={styles.messages}>
      <h2 className={styles.title}>Messages</h2>
      {messages.length > 0 ? (
        messages.map(message => (
          <div key={message.id} className={styles.messageItem}>
            <p><strong>{message.sender}</strong></p>
            <p>{message.content}</p>
            <p><small>{message.timestamp}</small></p>
          </div>
        ))
      ) : (
        <p>No new messages.</p>
      )}
    </div>
  );
};

export default Messages;

