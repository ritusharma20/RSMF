// models/donor.js
import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  donationAmount: Number,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donor || mongoose.model("Donor", donorSchema);