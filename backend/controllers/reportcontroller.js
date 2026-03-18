// controllers/reportController.js
import Report from "../models/report.js";

// GET ALL
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// CREATE
export const createReport = async (req, res) => {
  try {
    const newReport = new Report({
      title: req.body.title,
      description: req.body.description,
      pdf: req.file ? req.file.filename : ""  // multer single file
    });

    await newReport.save();
    res.json({ message: "Report Added Successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// UPDATE
export const updateReport = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description
    };

    if (req.file) {
      updateData.pdf = req.file.filename; // single file
    }

    await Report.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Updated Successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// DELETE
export const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};