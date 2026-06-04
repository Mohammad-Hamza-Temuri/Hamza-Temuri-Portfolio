import { Router } from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import skillRoutes from './skillRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import certificationRoutes from './certificationRoutes.js';
import contactRoutes from './contactRoutes.js';
import profileRoutes from './profileRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/skills', skillRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/certifications', certificationRoutes);
router.use('/contact', contactRoutes);
router.use('/profile', profileRoutes);
router.use('/upload', uploadRoutes);
router.use('/admin/analytics', analyticsRoutes);

export default router;
