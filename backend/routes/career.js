import express from 'express';
import Career from '../models/Career.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all career entries (Public)
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: careers,
      count: careers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching career entries',
      error: error.message
    });
  }
});

// Get single career entry (Public)
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career entry not found'
      });
    }

    res.json({
      success: true,
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching career entry',
      error: error.message
    });
  }
});

// Create career entry (Admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { position, company, description, year, startDate, endDate, isCurrent, order } = req.body;

    const career = new Career({
      position,
      company,
      description,
      year,
      startDate,
      endDate,
      isCurrent: isCurrent === 'true' || isCurrent === true,
      order: order || 0
    });

    await career.save();

    res.status(201).json({
      success: true,
      message: 'Career entry created successfully',
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating career entry',
      error: error.message
    });
  }
});

// Update career entry (Admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { position, company, description, year, startDate, endDate, isCurrent, order } = req.body;

    const career = await Career.findByIdAndUpdate(
      req.params.id,
      {
        position,
        company,
        description,
        year,
        startDate,
        endDate,
        isCurrent: isCurrent === 'true' || isCurrent === true,
        order
      },
      { new: true, runValidators: true }
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Career entry updated successfully',
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating career entry',
      error: error.message
    });
  }
});

// Delete career entry (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Career entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting career entry',
      error: error.message
    });
  }
});

export default router;
