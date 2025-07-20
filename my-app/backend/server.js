const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const CreditApplication = require('./models/CreditApplication');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI.replace(/\/[^/]+$/, `/${process.env.MONGO_URI.split('/').pop().toLowerCase()}`))
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// ✅ JWT Auth middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

// ✅ POST: Create a credit application
app.post('/api/demandes/', authenticateUser, async (req, res) => {
  const {
    person_age,
    person_gender,
    person_education,
    person_income,
    person_emp_exp,
    person_home_ownership,
    loan_amnt,
    loan_intent,
    loan_int_rate,
    loan_percent_income,
    cb_person_cred_hist_length,
    credit_score,
    previous_loan_defaults_on_file
  } = req.body;

  try {
    const application = new CreditApplication({
      userId: req.userId,
      person_age,
      person_gender,
      person_education,
      person_income,
      person_emp_exp,
      person_home_ownership,
      loan_amnt,
      loan_intent,
      loan_int_rate,
      loan_percent_income,
      cb_person_cred_hist_length,
      credit_score,
      previous_loan_defaults_on_file,
      insurance: true,
      loan_status: null, // ✅ pending by default
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error('❌ Error saving application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET: All credit requests
app.get('/api/demandes/', async (req, res) => {
  try {
    const demandes = await CreditApplication.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(demandes);
  } catch (err) {
    console.error('❌ Error fetching demandes:', err);
    res.status(500).json({ error: 'Failed to fetch demandes' });
  }
});

// ✅ GET: Only pending demandes
app.get('/api/demandes/pending', async (req, res) => {
  try {
    const pending = await CreditApplication.find({ loan_status: null })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(pending);
  } catch (err) {
    console.error('❌ Error fetching pending:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ PATCH: Update loan status
app.patch('/api/demandes/:id', async (req, res) => {
  try {
    const { loan_status } = req.body;
    if (![0, 1].includes(loan_status)) {
      return res.status(400).json({ error: 'Invalid loan_status (must be 0 or 1)' });
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
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ message: 'Loan status updated', updated });
  } catch (err) {
    console.error('❌ PATCH Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST: User signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role, gender, dob, phone, address } = req.body;

  if (role !== 'client') {
    return res.status(403).json({ message: 'Signup only allowed for clients' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
      gender,
      dob,
      phone,
      address
    });

    await newUser.save();
    res.status(201).json({ message: 'Client registered successfully' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST: User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
