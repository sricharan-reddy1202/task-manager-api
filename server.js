const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("Task Manager API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});