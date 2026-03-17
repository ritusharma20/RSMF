// import express from "express";
// import Gallery from "../models/Gallery.js";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // Set storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/"); // folder jahan images save hongi
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // unique name
//     }
// });
// const upload = multer({ storage: storage });

// // GET all gallery images
// router.get("/admin", async (req, res) => {
//     try {
//         const images = await Gallery.find().sort({ uploadedAt: -1 });
//         res.json(images);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // POST upload image
// router.post("/admin", upload.single("image"), async (req, res) => {
//     try {
//         const { title } = req.body;
//         const filename = req.file.filename;
//         const newImage = new Gallery({ title, filename });
//         await newImage.save();
//         res.status(201).json({ message: "Image uploaded successfully!" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// export default router;


// routes/admin.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// ✅ Fix path issue (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Multer storage (CORRECT PATH)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // backend/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // clean filename
  }
});

const upload = multer({ storage });

// ✅ POST: Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;

    const newImage = new Gallery({
      title,
      filename: req.file.filename
    });

    await newImage.save();

    res.json({ message: "Image uploaded successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ✅ GET: All images (gallery)
router.get('/gallery', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
});

export default router;