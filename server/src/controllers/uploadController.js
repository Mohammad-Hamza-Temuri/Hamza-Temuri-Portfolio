import cloudinary from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const uploadBuffer = async (buffer, mimetype, folder, resourceType = 'image') => {
  const b64 = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${mimetype};base64,${b64}`;
  return cloudinary.uploader.upload(dataURI, {
    folder: `hamza-portfolio/${folder}`,
    resource_type: resourceType,
  });
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 'No file provided', 400);
    const result = await uploadBuffer(req.file.buffer, req.file.mimetype, 'images');
    return successResponse(res, { url: result.secure_url, publicId: result.public_id }, 'Image uploaded');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 'No file provided', 400);
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: 'hamza-portfolio/resume/hamza-temuri-resume.pdf',
      resource_type: 'raw',
      overwrite: true,
    });
    return successResponse(res, { url: result.secure_url, publicId: result.public_id }, 'Resume uploaded');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteUpload = async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await cloudinary.uploader.destroy(publicId);
    return successResponse(res, null, 'File deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
