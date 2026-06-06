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

export const uploadExperienceLetter = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 'No file provided', 400);
    const exp = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        'letter.data': req.file.buffer,
        'letter.contentType': req.file.mimetype,
        'letter.filename': req.file.originalname,
        'letter.uploadedAt': new Date(),
      },
      { new: true }
    );
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    return successResponse(res, {
      filename: exp.letter.filename,
      contentType: exp.letter.contentType,
      uploadedAt: exp.letter.uploadedAt,
    }, 'Letter uploaded');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getExperienceLetter = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).select('+letter.data letter.contentType letter.filename').lean();
    if (!exp?.letter?.data) return res.status(404).json({ message: 'No letter uploaded' });
    const buffer = Buffer.isBuffer(exp.letter.data)
      ? exp.letter.data
      : Buffer.from(exp.letter.data.buffer ?? exp.letter.data);
    res.setHeader('Content-Type', exp.letter.contentType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${exp.letter.filename || 'experience-letter'}"`);
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
