import cloudinary from '../config/cloudinary.js';
import Profile from '../models/Profile.js';
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

export const getResumeDownload = async (req, res) => {
  try {
    const profile = await Profile.findOne().select('resume').lean();
    if (!profile?.resume?.publicId) return res.status(404).json({ message: 'No resume uploaded' });
    const signedUrl = cloudinary.url(profile.resume.publicId, {
      resource_type: 'raw',
      type: 'upload',
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 600,
    });
    return res.redirect(signedUrl);
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
