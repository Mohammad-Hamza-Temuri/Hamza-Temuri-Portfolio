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
    const profile = await Profile.findOne();
    const doc = profile || await Profile.create({});
    doc.resume = {
      data: req.file.buffer,
      contentType: req.file.mimetype || 'application/pdf',
      filename: req.file.originalname || 'resume.pdf',
      size: req.file.size,
      uploadedAt: new Date(),
    };
    await doc.save();
    return successResponse(res, {
      filename: doc.resume.filename,
      size: doc.resume.size,
      uploadedAt: doc.resume.uploadedAt,
    }, 'Resume uploaded');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getResumeDownload = async (req, res) => {
  try {
    const profile = await Profile.findOne().select('+resume.data resume.contentType resume.filename').lean();
    if (!profile?.resume?.data) return res.status(404).json({ message: 'No resume uploaded' });
    const buffer = Buffer.isBuffer(profile.resume.data)
      ? profile.resume.data
      : Buffer.from(profile.resume.data.buffer ?? profile.resume.data);
    res.setHeader('Content-Type', profile.resume.contentType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${profile.resume.filename || 'hamza-temuri-resume.pdf'}"`);
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
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
