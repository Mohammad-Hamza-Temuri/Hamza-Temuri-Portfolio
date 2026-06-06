import { Router } from 'express';
import { getExperiences, getAllAdminExperiences, createExperience, updateExperience, deleteExperience, uploadExperienceLetter, getExperienceLetter } from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.get('/', getExperiences);
router.get('/:id/letter', getExperienceLetter);
router.get('/admin/all', protect, getAllAdminExperiences);
router.post('/admin', protect, createExperience);
router.put('/admin/:id', protect, updateExperience);
router.delete('/admin/:id', protect, deleteExperience);
router.post('/admin/:id/letter', protect, upload.single('letter'), uploadExperienceLetter);
export default router;
