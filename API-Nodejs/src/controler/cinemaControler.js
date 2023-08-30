const getAllCinema = async (req, res) => {
  try {
    return res.status(200).json({ message: "test api" });
  } catch (error) {
    return res.status(500).json({ message: "test api error" });
  }
};

module.exports = { getAllCinema };
