const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CreditApplication = require('./models/CreditApplication');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const clientUser = await User.findOne({ role: 'client' });

    if (!clientUser) {
      console.log("❌ Aucun utilisateur avec le rôle 'client' trouvé.");
      return;
    }

    const updated = await CreditApplication.updateMany(
      { userId: { $exists: false } },
      { $set: { userId: clientUser._id } }
    );

    console.log(`✅ ${updated.modifiedCount} demandes mises à jour avec userId = ${clientUser._id}`);
    process.exit();
  })
  .catch(err => console.error("❌ Erreur de connexion :", err));
