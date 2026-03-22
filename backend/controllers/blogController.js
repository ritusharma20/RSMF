import Blog from "../models/Blog.js";
import fs from "fs";
import path from "path";

// ✅ CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const blog = new Blog({
      title,
      description,
      image: req.file ? req.file.filename : ""
    });

    await blog.save();
    res.json({ message: "Blog Created", blog });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.image) {
      fs.unlinkSync(`uploads/${blog.image}`);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};