import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (config.nodeEnv === 'development') app.use(morgan('dev'));

app.use('/api/v1', routes);

app.get('/api/v1/health', (req, res) => res.json({ status: 'ok', env: config.nodeEnv }));

app.use(errorHandler);

export default app;
