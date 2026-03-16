import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  inquiry: String,
  subject: String,
  message: String,
  attachment: String,  // filename of uploaded file
  subscribe: { type: Boolean, default: false }
}, { timestamps: true });

// Avoid "overwrite model" errors
export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);