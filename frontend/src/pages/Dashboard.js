import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from "../services/taskService";

import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    try {
      const newTask = await createTask({ title });

      // add new task at top
      setTasks((prevTasks) => [newTask, ...prevTasks]);

      setTitle("");
    } catch (error) {
      alert("Failed to create task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const updatedTask = await updateTask(id, {
        status: "completed"
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      {/* Create Task */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onComplete={handleUpdateStatus}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;