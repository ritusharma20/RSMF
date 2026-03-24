import express from "express";
import upload from "../middleware/upload.js"; // ✅ apna custom multer use karo

import {
  getReports,
  createReport,
  updateReport,
  deleteReport
} from "../controllers/reportcontroller.js";

const router = express.Router();

// Routes
router.get("/", getReports);

// ✅ PDF upload (reports)
router.post("/", upload.single("pdf"), createReport);

router.put("/:id", upload.single("pdf"), updateReport);

router.delete("/:id", deleteReport);

export default router;