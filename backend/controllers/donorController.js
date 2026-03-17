// controllers/donorController.js
import Donor from "../models/donor.js";

// Submit donation form
export const submitDonor = async (req, res) => {
  try {
    const { name, email, phone, address, donationAmount, message } = req.body;
    const newDonor = new Donor({ name, email, phone, address, donationAmount, message });
    await newDonor.save();
    res.status(201).json({ message: "Donation submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all donors (Admin)
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};