import Story from "../models/story.js";

// ADD STORY (Admin)
export const addStory = async (req, res) => {
    try {
        const { title, description } = req.body;

        const image = req.file ? req.file.filename : null;

        const story = new Story({
            title,
            description,
            image
        });

        await story.save();

        res.status(201).json({
            success: true,
            message: "Story added successfully",
            story
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL STORIES (Frontend)
export const getStories = async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            stories
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteStory = async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};