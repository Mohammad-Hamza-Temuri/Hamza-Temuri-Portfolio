import Project from '../models/Project.js';
import { generateSlug } from '../utils/generateSlug.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getPublicProjects = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { status: 'published' };
    if (category && category !== 'all') filter.category = category;
    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    return successResponse(res, projects);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'published', isFeatured: true }).sort({ displayOrder: 1 }).limit(6);
    return successResponse(res, projects);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
    if (!project) return errorResponse(res, 'Project not found', 404);
    return successResponse(res, project);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getAllAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    return successResponse(res, projects);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const createProject = async (req, res) => {
  try {
    const slug = await generateSlug(req.body.title);
    const project = await Project.create({ ...req.body, slug });
    return successResponse(res, project, 'Project created', 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateProject = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = await generateSlug(req.body.title, req.params.id);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return errorResponse(res, 'Project not found', 404);
    return successResponse(res, project, 'Project updated');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return errorResponse(res, 'Project not found', 404);
    return successResponse(res, null, 'Project deleted');
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
