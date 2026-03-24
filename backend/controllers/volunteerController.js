import Volunteer from "../models/volunteer.js";

// ✅ Save Volunteer Form
export const createVolunteer = async (req, res) => {
    try {
        const { name, email, phone, interest, message, status } = req.body;

        // 🔥 ADD THIS LINE
        const cvFile = req.file ? req.file.filename : "";

        const newVolunteer = new Volunteer({
            name,
            email,
            phone,
            interest,
            message,
            status: status || "pending",
            cv: cvFile // 🔥 SAVE CV
        });

        await newVolunteer.save();

        res.status(201).json({
            success: true,
            message: "Volunteer Registered Successfully",
            data: newVolunteer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving volunteer",
            error: error.message
        });
    }
};
// ✅ Get All Volunteers (Admin Panel)
export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: volunteers.length,
            volunteers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching volunteers",
            error: error.message
        });
    }
};

export const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;

        const volunteer = await Volunteer.findByIdAndDelete(id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Volunteer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting volunteer",
            error: error.message
        });
    }
};


export const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Volunteer.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Volunteer updated successfully",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating volunteer",
            error: error.message
        });
    }
};



// SEARCH VOLUNTEERS
export const searchVolunteers = async (req, res) => {
    try {
        const { query } = req.query; // ?query=something
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const regex = new RegExp(query, "i"); // case-insensitive

        const volunteers = await Volunteer.find({
            $or: [
                { name: regex },
                { email: regex },
                { phone: regex },
                { interest: regex }
            ]
        });

        res.status(200).json({
            success: true,
            count: volunteers.length,
            volunteers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching volunteers",
            error: error.message
        });
    }
};

// GET PENDING
export const getPending = async (req, res) => {
  const data = await Volunteer.find({ status: "pending" });
  res.json({ success: true, volunteers: data });
};

// GET APPROVED
export const getApproved = async (req, res) => {
  const data = await Volunteer.find({ status: "approved" });
  res.json({ success: true, volunteers: data });
};

// ACCEPT
export const acceptVolunteer = async (req, res) => {
  await Volunteer.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json({ success: true });
};

// REJECT
export const rejectVolunteer = async (req, res) => {
  await Volunteer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};