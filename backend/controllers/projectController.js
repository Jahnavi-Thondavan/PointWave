const Project = require("../models/Project");

// CREATE A PROJECT
const createProject = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can create projects",
      });
    }

    const {
      title,
      description,
      category,
      skills,
      budget,
      timeline,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !skills ||
      skills.length === 0 ||
      !budget ||
      !timeline
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category, skills, budget, and timeline are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      category,
      skills,
      budget,
      timeline,
      client: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};

// GET ONE PROJECT BY ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to retrieve project",
      error: error.message,
    });
  }
};

// UPDATE A PROJECT
const updateProject = async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can update projects",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only the client who created the project can update it.
    if (project.client.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own projects",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "skills",
      "budget",
      "timeline",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
};