const express = require('express');
const router = express.Router();
const CreditApplication = require('../models/CreditApplication');
const auth = require('../middleware/auth');

// ✅ POST: Submit credit application
router.post('/apply', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const credit = new CreditApplication({
      ...req.body,
      userId,
      loan_status: null, // default to "pending"
    });

    await credit.save();
    res.status(201).json({ message: '✅ Credit application submitted', credit });
  } catch (err) {
    console.error('❌ Submission error:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
});

// ✅ GET: All applications with client name/email
router.get('/applications', async (req, res) => {
  try {
    const applications = await CreditApplication.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error('❌ Fetching error:', err);
    res.status(500).json({ message: 'Fetching failed' });
  }
});

// ✅ GET: Only pending applications
router.get('/applications/pending', async (req, res) => {
  try {
    const pending = await CreditApplication.find({ loan_status: null })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(pending);
  } catch (err) {
    console.error('❌ Pending fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch pending applications' });
  }
});

// ✅ PATCH: Update loan status
router.patch('/applications/:id', async (req, res) => {
  try {
    const { loan_status } = req.body;

    if (![0, 1].includes(loan_status)) {
      return res.status(400).json({ error: 'Invalid loan_status: must be 0 (Rejected) or 1 (Approved)' });
    }

    const updated = await CreditApplication.findByIdAndUpdate(
      req.params.id,
      {
        loan_status,
        decisionDate: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Credit application not found' });
    }

    res.json({ message: 'Loan status updated', updated });
  } catch (err) {
    console.error('❌ Loan status update error:', err);
    res.status(500).json({ error: 'Failed to update loan status' });
  }
});

module.exports = router;
