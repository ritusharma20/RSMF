import express from "express";
import multer from "multer";
import { createNews, getNews, deleteNews } from "../controllers/newsController.js";

const router = express.Router();

// UPLOAD
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createNews);
router.get("/", getNews);
router.delete("/:id", deleteNews);

export default router;