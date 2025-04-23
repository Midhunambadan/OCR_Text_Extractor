
import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js';
import upload from '../middlewares/multer.js';
import tesseractMiddleware from '../middlewares/tesseract.js';
  

router.get('/',userController.home);
router.post('/extract',upload.single('file'),tesseractMiddleware ,userController.extractText)


export default router