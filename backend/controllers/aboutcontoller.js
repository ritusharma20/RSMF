import About from "../models/about.js";

// GET
export const getAbout = async (req, res) => {
  let data = await About.findOne();

  if (!data) {
    data = await About.create({ sections: [] }); // ensure doc exists
  }

  res.json(data);
};

// ADD
export const addSection = async (req, res) => {
  try {
    const { title, content } = req.body;

    let about = await About.findOne();

    if (!about) {
      about = new About({ sections: [] });
    }

    const newSection = {
      title: title || "",
      content: content || "",
      image: req.file ? req.file.filename : ""
    };

    about.sections.push(newSection);

    await about.save();

    res.json({ message: "Added Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findOne();
    if (!about) return res.status(404).json({ msg: "No data" });

    const section = about.sections.id(id);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    section.title = req.body.title || section.title;
    section.content = req.body.content || section.content;

    if (req.file) {
      section.image = req.file.filename;
    }

    await about.save();

    res.json({ message: "Updated Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findOne();
    if (!about) return res.status(404).json({ msg: "No data" });

    about.sections = about.sections.filter(sec => sec._id != id);

    await about.save();

    res.json({ message: "Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};