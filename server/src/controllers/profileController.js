import Profile from '../models/Profile.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne().lean();
    if (!profile) profile = await Profile.create({});
    return successResponse(res, profile);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    }
    return successResponse(res, profile, 'Profile updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
