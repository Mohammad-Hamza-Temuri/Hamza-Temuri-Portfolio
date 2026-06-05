import './config/env.js';
import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

const start = async () => {
  console.log('MONGODB_URI set:', !!process.env.MONGODB_URI, '| starts with:', process.env.MONGODB_URI?.slice(0, 20));
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} [${config.nodeEnv}]`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌  Port ${config.port} is already in use.`);
      console.error(`    Run this command to free it:\n`);
      console.error(`    npx kill-port ${config.port}\n`);
      console.error(`    Then restart: npm run dev\n`);
      process.exit(1);
    } else {
      throw err;
    }
  });
};

start();
