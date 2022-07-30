
const express = require("express");
const serverless = require("serverless-http");
const GalleryService = require("./service");
const validation = require('./validation');
const app = express();
app.use(express.json());

app.get("/gallery/:id", async function (req, res) {
  try {
    if (!validation.isvalidId()) {
      res.json({ message: 'ID type is invalid / missing', status: 400 });
    }
    let data = await GalleryService.getById(req.params.id);
    if (!data || !data.Item) {
      res.json({ message: `No Album found with such Id : ${req.params.id}`, status: 400 })
    }
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ message: "Error in server", detail: err });
  }
});

app.post("/gallery/", async function (req, res) {
  try {
    if (validation.isPostDataValid(req)) {
      res.json({ message: 'Invalid Body . Mandatory field: Name. Type: String, Optional Field: image Type: array', status: 400 });
    }
    let gallery = await GalleryService.addGallery(req.body);
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/gallery/:id', async function (req, res) {
  try {
    if (!validation.isvalidId()) {
      res.json({ message: 'ID type is invalid / missing', status: 400 });
    }
    let gallery = await GalleryService.update(req.params.id, req.body);
    res.status(200).json(gallery);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/gallery/:id', async function (req, res) {
  try {
    if (!validation.isvalidId()) {
      res.json({ message: 'ID type is invalid / missing', status: 400 });
    }
    await GalleryService.delete(req.params.id);
    res.status(200).json({ message: `Album id : ${req.params.id} deleted successfully` });
  }
  catch (err) {
    res.json({ message: error });
  }
});

const handler = serverless(app);


module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  const data = JSON.parse(result.body);
  if (data.status) {
    result.statusCode = data.status;
  }
  return result;
};
