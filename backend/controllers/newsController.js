import News from "../models/News.js";

// CREATE
export const createNews = async (req, res) => {
  try {
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename
    });

    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
export const getNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
};

// DELETE
export const deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};