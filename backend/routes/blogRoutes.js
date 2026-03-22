import express from "express";
import multer from "multer";
import {
  createBlog,
  getBlogs,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// 📁 Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// routes
router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.delete("/:id", deleteBlog);

export default router;