import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { errorResponse } from '../utils/apiResponse.js';

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return errorResponse(res, 'Not authorized', 401);
  }
  try {
    const token = auth.split(' ')[1];
    req.admin = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};
