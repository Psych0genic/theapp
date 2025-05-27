import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Thread from '../models/Thread.js';

const router = express.Router();

// Create a new thread
router.post('/', authMiddleware, async (req, res) => {
  try {
    const thread = await Thread.create({
      userId: req.user.id,
      title: req.body.title || 'New Thread'
    });
    res.status(201).json(thread);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

// List all threads for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load threads' });
  }
});

export default router;