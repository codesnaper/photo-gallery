
const express = require("express");
const serverless = require("serverless-http");
const ShareService= require("./service");

const app = express();
app.use(express.json());

app.get("/share/:id", async function (req, res) {
  try{
    if (!req.params.id) {
      res.status(400).json({ message: 'missing id' });
    }
    let data = await ShareService.getById(req.params.id);
    if(!data || !data.Item){
      res.status(400).json({message: `No Album found with such Id : ${req.params.id}`, status: 400})
    }
    res.status(200).json(data.Item);
  } catch(err) {
    res.status(500).json({message: "Error in server", detail : err});
  }
});

app.post("/share/", async function (req, res) {
  try {
    if(!req.body || !req.body.albumID || !req.body.expiryDate || !req.body.permission || req.body.sharedUserId || req.body.userID){
      res.status(400).json({status: 400, message: 'Invalid Body . Mandatory attribute are: albumId,expiryDate ,permission,sharedUserId, userID '});
    }
    if(Array.isArray(!req.body.albumID)){
      res.json({status: 400, message: 'AlbumId attribute should be type of array'});
    }
    if(req.body.image && !Array.isArray(req.body.image)){
      res.json({status: 400, message: 'Image attribute should be type of array'});
    }
    let gallery = await ShareService.addShare(req.body);
    res.status(200).json(gallery);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.put('/share/:id', async function (req, res) {
  try{
    let gallery = await ShareService.update(req.params.id, req.body);
    res.status(200).json(gallery);
  } catch(err){
    res.status(500).json(err);
  }
});

app.delete('/share/:id', async function (req,res) {
  try{
    if(!req.params.id){
      res.status(400).json({ message: 'missing id' });
    }
    await ShareService.delete(req.params.id);
    res.status(200).json({message: `Album id : ${req.params.id} deleted successfully`});
  }
  catch(err){
    res.json({message: error});
  }
});

const handler = serverless(app);


module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  const data = JSON.parse(result.body);
  if(data.status){
    result.statusCode = data.status;
  }
  return result;
};
