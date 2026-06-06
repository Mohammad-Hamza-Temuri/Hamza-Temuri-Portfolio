import { Router } from 'express';
import { uploadImage, uploadResume, deleteUpload, getResumeDownload } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.get('/resume', getResumeDownload);
router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/resume', protect, upload.single('resume'), uploadResume);
router.delete('/:publicId', protect, deleteUpload);
export default router;
