import { Router } from 'express';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/', getCertifications);
router.post('/admin', protect, createCertification);
router.put('/admin/:id', protect, updateCertification);
router.delete('/admin/:id', protect, deleteCertification);
export default router;
