import { Router } from 'express';
import {
  getPublicProjects, getFeaturedProjects, getProjectBySlug,
  getAllAdminProjects, createProject, updateProject, deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getPublicProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProjectBySlug);

router.get('/admin/all', protect, getAllAdminProjects);
router.post('/admin', protect, createProject);
router.put('/admin/:id', protect, updateProject);
router.delete('/admin/:id', protect, deleteProject);

export default router;
