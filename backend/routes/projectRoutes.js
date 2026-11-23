const express = require("express");

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a project
router.post("/", protect, createProject);

// Retrieve all projects
router.get("/", getAllProjects);

// Retrieve one project by ID
router.get("/:id", getProjectById);

// Update a project
router.put("/:id", protect, updateProject);

module.exports = router;