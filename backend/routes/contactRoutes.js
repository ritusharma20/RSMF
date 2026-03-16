import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { submitContact } from "../controllers/contactControllers.js";

const router = express.Router();

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Route
router.post("/", upload.single("attachment"), submitContact);

export default router;