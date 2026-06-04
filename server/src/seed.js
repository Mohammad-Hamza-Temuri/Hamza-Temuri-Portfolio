import './config/env.js';
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';

const seed = async () => {
  await connectDB();
  const exists = await Admin.findOne({ email: 'hamzatemuri2001@gmail.com' });
  if (exists) {
    console.log('Admin already exists.');
    process.exit(0);
  }
  await Admin.create({
    name: 'Muhammad Hamza Temuri',
    email: 'hamzatemuri2001@gmail.com',
    password: 'Admin@1234',
  });
  console.log('✅ Admin created: hamzatemuri2001@gmail.com / Admin@1234');
  console.log('⚠️  Change this password immediately after first login!');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
