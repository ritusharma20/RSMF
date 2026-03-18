import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';

// ✅ Upload
export const uploadImage = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new Gallery({
      title,
      filename: req.file.filename
    });

    await newImage.save();

    res.json({ message: "Image uploaded successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};


// ✅ Get Gallery
export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};


// ✅ DELETE (DB + file dono delete 🔥)
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 🔥 file delete from uploads folder
    const filePath = path.join('uploads', image.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // DB delete
    await Gallery.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};