import Certification from '../models/Certification.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find({ isPublished: true }).sort({ displayOrder: 1 });
    return successResponse(res, certs);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const createCertification = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    return successResponse(res, cert, 'Certification created', 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return errorResponse(res, 'Certification not found', 404);
    return successResponse(res, cert, 'Certification updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteCertification = async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    return successResponse(res, null, 'Certification deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
