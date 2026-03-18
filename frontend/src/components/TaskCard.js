import React from "react";

function TaskCard({ task, onDelete, onComplete }) {
  return (
    <div
      style={{
        background: "white",
        marginTop: "10px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)"
      }}
    >
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>

      <button onClick={() => onDelete(task._id)}>Delete</button>

      {task.status !== "completed" && (
        <button onClick={() => onComplete(task._id)}>
          Complete
        </button>
      )}
    </div>
  );
}

export default TaskCard;