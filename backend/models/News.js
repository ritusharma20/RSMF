import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("News", newsSchema);