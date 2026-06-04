import { Router } from 'express';
import { getTestimonials, getAllAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/', getTestimonials);
router.get('/admin/all', protect, getAllAdminTestimonials);
router.post('/admin', protect, createTestimonial);
router.put('/admin/:id', protect, updateTestimonial);
router.delete('/admin/:id', protect, deleteTestimonial);
export default router;
