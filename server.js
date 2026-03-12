const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Task Manager API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});