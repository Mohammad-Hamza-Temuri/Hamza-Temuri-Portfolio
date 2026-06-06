import Experience from '../models/Experience.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isPublished: true })
      .sort({ displayOrder: 1, startDate: -1 })
      .lean();
    return successResponse(res, experiences);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getAllAdminExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1, startDate: -1 });
    return successResponse(res, experiences);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const createExperience = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    return successResponse(res, exp, 'Experience created', 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    return successResponse(res, exp, 'Experience updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    return successResponse(res, null, 'Experience deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
