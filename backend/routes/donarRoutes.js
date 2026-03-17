// routes/donorRoutes.js
import express from "express";
import { submitDonor, getAllDonors } from "../controllers/donorController.js";

const router = express.Router();

// Public route: submit donation
router.post("/", submitDonor);

// Admin route: get all donors
router.get("/admin", getAllDonors);

export default router;