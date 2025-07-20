// routes/dashboard.js
const express = require("express");
const router = express.Router();
const CreditRequest = require("../models/CreditRequest");
const Report = require("../models/Report");
const Feedback = require("../models/Feedback");

// Dashboard statistics route
router.get("/stats", async (req, res) => {
  try {
    const stats = {
      generatedReports: await Report.countDocuments(),
      completedAnalyses: Math.floor(Math.random() * 10000),
      processedRequests: await CreditRequest.countDocuments(),
      satisfiedClients: Math.floor(Math.random() * 5000),
      activeUsers: Math.floor(Math.random() * 1000),
      acceptanceRate: Math.floor(Math.random() * 100),
      creditEvolution: Math.floor(Math.random() * 10000),
      messagesReceived: Math.floor(Math.random() * 500),
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to load statistics" });
  }
});

router.get("/credits", async (req, res) => {
  const credits = await CreditRequest.find().sort({ date: -1 });
  res.json(credits);
});

router.get("/reports", async (req, res) => {
  const reports = await Report.find().limit(5).sort({ createdAt: -1 });
  res.json(reports);
});

router.get("/feedback", async (req, res) => {
  const feedbacks = await Feedback.find().limit(6);
  res.json(feedbacks);
});

module.exports = router;
