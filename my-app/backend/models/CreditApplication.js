const mongoose = require('mongoose');

const creditApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  person_age: {
    type: Number,
    required: true,
  },
  person_gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  person_education: {
    type: String,
    enum: ['High School', 'Bachelor', 'Master', 'Associate'],
    required: true,
  },
  person_income: {
    type: Number,
    required: true,
  },
  person_home_ownership: {
    type: String,
    enum: ['rent', 'own', 'mortgage'],
    required: true,
  },
  person_emp_exp: {
    type: Number,
    required: true,
  },

  loan_amnt: {
    type: Number,
    required: true,
  },
  loan_int_rate: {
    type: Number,
    required: true,
  },
  loan_percent_income: {
    type: Number,
    required: true,
  },
  loan_intent: {
    type: String,
    enum: ['EDUCATION', 'VENTURE', 'PERSONAL', 'MEDICAL', 'DEBTCONSOLIDATION'],
    required: true,
  },

  cb_person_cred_hist_length: {
    type: Number,
    required: true,
  },
  credit_score: {
    type: Number,
    required: true,
  },
  previous_loan_defaults_on_file: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },



  decisionDate: {
    type: Date,
  },  
  loan_status: {
    type: Number, 
    enum: [0, 1],
    default: null 
  },
}, { timestamps: true });

module.exports = mongoose.model('CreditApplication', creditApplicationSchema);
