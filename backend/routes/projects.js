import express from 'express';
import Project from '../models/Project.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get single project (Public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Create project (Admin only)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, tools, projectUrl, githubUrl, order, featured } = req.body;

    const projectData = {
      title,
      category,
      description,
      tools: typeof tools === 'string' ? tools.split(',').map(t => t.trim()) : tools,
      projectUrl,
      githubUrl,
      order: order || 0,
      featured: featured === 'true' || featured === true,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    };

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Update project (Admin only)
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, category, description, tools, projectUrl, githubUrl, order, featured } = req.body;

    const updateData = {
      title,
      category,
      description,
      tools: typeof tools === 'string' ? tools.split(',').map(t => t.trim()) : tools,
      projectUrl,
      githubUrl,
      order,
      featured: featured === 'true' || featured === true
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Delete project (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// Toggle project active status (Admin only)
router.patch('/:id/toggle', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.isActive = !project.isActive;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.isActive ? 'activated' : 'deactivated'} successfully`,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling project status',
      error: error.message
    });
  }
});

export default router;
