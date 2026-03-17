// import mongoose from "mongoose";

// const gallerySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     filename: { type: String, required: true }, // server file name
//     uploadedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Gallery", gallerySchema);

// models/Gallery.js
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: String,
  filename: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Gallery', gallerySchema);