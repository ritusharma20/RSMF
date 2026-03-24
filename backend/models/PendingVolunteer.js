import mongoose from "mongoose";

const pendingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  interest: String,
  message: String
}, { timestamps: true });

export default mongoose.model("PendingVolunteer", pendingSchema);