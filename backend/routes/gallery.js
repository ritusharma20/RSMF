import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  uploadImage,
  getGallery,
  deleteImage
} from '../controllers/gallerycontroller.js';

const router = express.Router();

// ✅ __dirname fix (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// =======================
// ✅ ROUTES (NO MISMATCH)
// =======================

// 👉 Upload Image
// URL: POST /api/gallery/upload
router.post('/upload', upload.single('image'), uploadImage);

// 👉 Get All Images
// URL: GET /api/gallery/gallery
router.get('/gallery', getGallery);

// 👉 Delete Image
// URL: DELETE /api/gallery/gallery/:id
router.delete('/gallery/:id', deleteImage);

export default router;