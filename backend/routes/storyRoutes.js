import express from "express";
import { addStory, getStories, deleteStory  } from "../controllers/storyController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Add Story (Admin)
router.post("/add", upload.single("image"), addStory);

// Get Stories (Frontend)
router.get("/all", getStories);
// import { deleteStory } from "../controllers/storyController.js";

router.delete("/delete/:id", deleteStory);

export default router;