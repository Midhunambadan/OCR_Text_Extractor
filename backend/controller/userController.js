const home = async (req, res) => {
  try {
    res.render("index", { data: "" });
  } catch (error) {
    console.log("Hey i am midhun");
  }
};

const extractText = async (req, res) => {
  try {
    const extractedText = req.extractData;
    if (extractedText) {
      console.log(extractedText);
      res.status(200).json({ text: extractedText });
    } else {
      res.status(400).json({message:'No text extracted'})
    }
  } catch (error) {
    console.log("Hey i am extractText");
    res.status(500).json({message:'Server error'})
  }
};

const userController = {
  extractText,
  home,
};

export default userController;
