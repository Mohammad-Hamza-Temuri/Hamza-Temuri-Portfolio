import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/', getSkills);
router.post('/admin', protect, createSkill);
router.put('/admin/:id', protect, updateSkill);
router.delete('/admin/:id', protect, deleteSkill);
export default router;
