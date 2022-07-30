
const express = require("express");
const serverless = require("serverless-http");
const { addGallery, getById, update } = require("./service/gallery");

const app = express();
app.use(express.json());

app.get("/gallery/:id", function (req, res) {
    if (!req.params.id) {
      res.status(404).json({ message: 'missing id' });
    }
    getById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

app.post("/gallery/", async function (req, res) {
  try {
    let gallery = await addGallery(req.body);
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/gallery/:id', async function (req, res) {
  try{
    let gallery = await update(req.params.id, req.body);
    res.status(200).json(gallery);
  } catch(err){
    res.status(500).json(err);
  }
});

const handler = serverless(app);


module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
