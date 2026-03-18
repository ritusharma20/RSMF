import express from "express";
import multer from "multer";
import {
  getReports,
  createReport,
  updateReport,
  deleteReport
} from "../controllers/reportcontroller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/pdfs"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Routes
router.get("/", getReports);
router.post("/", upload.single("pdf"), createReport);    // single PDF
router.put("/:id", upload.single("pdf"), updateReport);  // single PDF
router.delete("/:id", deleteReport);

export default router;