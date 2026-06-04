import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { config } from '../config/env.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const signToken = (id) => jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, 'Email and password required', 400);

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken(admin._id);
    const { password: _p, ...adminData } = admin.toObject();
    return successResponse(res, { token, admin: adminData }, 'Login successful');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return errorResponse(res, 'Admin not found', 404);
    return successResponse(res, admin);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!(await admin.comparePassword(currentPassword))) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }
    admin.password = newPassword;
    await admin.save();
    return successResponse(res, null, 'Password updated successfully');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
