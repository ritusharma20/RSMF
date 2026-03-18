import express from "express";
import multer from "multer";
import {
  getAbout,
  addSection,
  updateSection,
  deleteSection
} from "../controllers/aboutcontoller.js";

const router = express.Router();

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});

const upload = multer({ storage });

router.get("/", getAbout);
router.post("/", upload.single("image"), addSection);
router.put("/:id", upload.single("image"), updateSection);
router.delete("/:id", deleteSection);

export default router;