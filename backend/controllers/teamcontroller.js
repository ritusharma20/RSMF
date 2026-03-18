import Team from "../models/team.js";

// ✅ GET ALL
export const getTeam = async (req, res) => {
  try {
    const data = await Team.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ CREATE
export const createTeam = async (req, res) => {
  try {
    const newMember = new Team({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      image: req.file 
        ? `http://localhost:5000/uploads/${req.file.filename}` 
        : ""
    });

    await newMember.save();

    res.json({ message: "Member added successfully" });

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
export const updateTeam = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description
    };

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await Team.findByIdAndUpdate(req.params.id, updateData);

    res.json({ message: "Member updated successfully" });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
export const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};