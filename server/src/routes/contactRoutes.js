import { Router } from 'express';
import { submitContact, getContacts, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();
router.post('/', contactLimiter, submitContact);
router.get('/admin', protect, getContacts);
router.patch('/admin/:id', protect, updateContactStatus);
router.delete('/admin/:id', protect, deleteContact);
export default router;
