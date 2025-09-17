// Smoke test for DB and Ship model CRUD
// Usage: npm run smoke

require('dotenv').config();
const connectDB = require('../config/database');
const Ship = require('../models/Ship');

(async () => {
  try {
    await connectDB();
    const ship = await Ship.create({ name: 'Test Ship', description: 'Smoke test' });
    console.log('Created ship:', ship.toJSON());
    await Ship.deleteOne({ _id: ship.id });
    console.log('Cleanup done');
    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:', err);
    process.exit(1);
  }
})();
