import express from "express";
import multer from "multer";
import {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} from "../controllers/teamcontroller.js";

const router = express.Router();

// 📂 Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 🔥 ROUTES
router.get("/", getTeam);
router.post("/", upload.single("image"), createTeam);
router.put("/:id", upload.single("image"), updateTeam);
router.delete("/:id", deleteTeam);

export default router;