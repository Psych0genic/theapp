import express from 'express';
import fetch from 'node-fetch'; // If you're on Node <18
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { message } = req.body;

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: message,
        stream: false
      })
    });

    const data = await ollamaRes.json();
    res.json({ response: data.response });
  } catch (err) {
    console.error('Ollama error:', err.message);
    res.status(500).json({ error: 'Failed to get response from Ollama' });
  }
});

export default router;