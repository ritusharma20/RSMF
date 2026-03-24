import express from "express";
import Volunteer from "../models/volunteer.js";
import Report from "../models/report.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.countDocuments();
    const reports = await Report.countDocuments();
    const approved = await Volunteer.countDocuments({ status: "approved" });

    res.json({
      volunteers,
      reports,
      approved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;