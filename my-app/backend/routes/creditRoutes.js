const express = require('express');
const router = express.Router();
const CreditApplication = require('../models/CreditApplication');
const auth = require('../middleware/auth');

// POST: Apply for credit
router.post('/apply', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const credit = new CreditApplication({ ...req.body, userId });

    await credit.save();
    res.status(201).json({ message: 'Credit application submitted' });
  } catch (err) {
    console.error('❌ Submission error:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
});


// GET: Applications with client name
router.get('/applications', async (req, res) => {
  try {
    const applications = await CreditApplication.find().populate('userId', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Fetching failed' });
  }
});

module.exports = router;
