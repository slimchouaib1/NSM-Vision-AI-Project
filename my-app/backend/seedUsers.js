// Run once to populate default users
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

const users = [
  { name: 'Admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { name: 'Analyst', email: 'analyst@gmail.com', password: 'analyst123', role: 'analyst' },
  { name: 'Decision-Maker', email: 'decision@gmail.com', password: 'decision123', role: 'decision-maker' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    for (let u of users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        const hashed = await bcrypt.hash(u.password, 10);
        await User.create({ ...u, password: hashed });
        console.log(`✅ Created ${u.role}: ${u.email}`);
      }
    }
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
})();
