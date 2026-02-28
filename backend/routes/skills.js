import express from 'express';
import Skill from '../models/Skill.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all skills (Public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: skills,
      count: skills.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
});

// Create skill (Admin only)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, category, proficiency, order } = req.body;

    const skill = new Skill({
      name,
      category,
      proficiency: proficiency || 50,
      order: order || 0,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    });

    await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating skill',
      error: error.message
    });
  }
});

// Update skill (Admin only)
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, category, proficiency, order } = req.body;

    const updateData = {
      name,
      category,
      proficiency,
      order
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating skill',
      error: error.message
    });
  }
});

// Delete skill (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: error.message
    });
  }
});

export default router;
