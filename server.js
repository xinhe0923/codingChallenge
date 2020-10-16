const express = require("express");

const app = express();

app.use(express.json()); //automatically parse incoming joson object

app.post("/", async (req, res) => {
  try {
    let elementList = req.body.payload;
    elementList = elementList.filter((element) => {
      return element.drm && element.episodeCount > 0;
    });
    const response = elementList.map((element) => {
      const { image, slug, title } = element;
      //   console.log({ image, slug, title });
      return { image: image.showImage, slug, title };
    });
    const result = { response: response };
    res.send(result);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Could not decode request: JSON parsing failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
