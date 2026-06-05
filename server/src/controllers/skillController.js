import Skill from '../models/Skill.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ isVisible: true }).sort({ category: 1, displayOrder: 1 });
    return successResponse(res, skills);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    return successResponse(res, skill, 'Skill created', 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return errorResponse(res, 'Skill not found', 404);
    return successResponse(res, skill, 'Skill updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return errorResponse(res, 'Skill not found', 404);
    return successResponse(res, null, 'Skill deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
