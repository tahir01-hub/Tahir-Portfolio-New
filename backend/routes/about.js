import express from 'express';
import About from '../models/About.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get about info (Public)
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about information',
      error: error.message
    });
  }
});

// Create or update about info (Admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, skills, imageUrl } = req.body;

    // Deactivate all existing about records
    await About.updateMany({}, { isActive: false });

    const about = new About({
      title,
      description,
      skills,
      imageUrl,
      isActive: true
    });

    await about.save();

    res.status(201).json({
      success: true,
      message: 'About information created successfully',
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating about information',
      error: error.message
    });
  }
});

// Update about info (Admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, skills, imageUrl } = req.body;

    const about = await About.findByIdAndUpdate(
      req.params.id,
      { title, description, skills, imageUrl },
      { new: true, runValidators: true }
    );

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }

    res.json({
      success: true,
      message: 'About information updated successfully',
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating about information',
      error: error.message
    });
  }
});

// Delete about info (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }

    res.json({
      success: true,
      message: 'About information deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting about information',
      error: error.message
    });
  }
});

export default router;
