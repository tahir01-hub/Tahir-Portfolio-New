import express from 'express';
import Settings from '../models/Settings.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get settings (Public)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      // Create default settings if none exist
      settings = new Settings();
      await settings.save();
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message
    });
  }
});

// Update settings (Admin only)
router.put('/', authenticate, async (req, res) => {
  try {
    const updateData = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(updateData);
    } else {
      Object.assign(settings, updateData);
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error.message
    });
  }
});

export default router;
