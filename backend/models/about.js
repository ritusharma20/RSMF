import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String
});

const aboutSchema = new mongoose.Schema({
  sections: [sectionSchema]
});

export default mongoose.model("About", aboutSchema);