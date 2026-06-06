import Testimonial from '../models/Testimonial.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ displayOrder: 1 })
      .lean();
    return successResponse(res, testimonials);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getAllAdminTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
    return successResponse(res, testimonials);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    return successResponse(res, t, 'Testimonial created', 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!t) return errorResponse(res, 'Testimonial not found', 404);
    return successResponse(res, t, 'Testimonial updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) return errorResponse(res, 'Testimonial not found', 404);
    return successResponse(res, null, 'Testimonial deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
