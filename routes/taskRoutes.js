const express = require("express");
const router = express.Router();

const { createTask,getTasks, getTaskById } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
module.exports = router;