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
import { fileURLToPath } from 'url';

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Delete ID:", id); // debug

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../uploads', image.filename);

    console.log("File path:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted");
    } else {
      console.log("File NOT found");
    }

    await Gallery.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};