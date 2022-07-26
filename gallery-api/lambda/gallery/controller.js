
const tableName = process.env.GALLERY_TABLE;
const express = require("express");
const serverless = require("serverless-http");
const { addGallery } = require("./service/addGallery");
const { getById } = require("./service/getGallery");

const app = express();

app.get("/:albumId", async function (req, res) {
    if(req.params.albumId){
        res.status(404).json({message: 'missing album id'});
    }
    
})

app.post("/", async  function(req,res) {
  try{
    let gallery = await addGallery(req);
    res.status(200).json(gallery);
  } catch(error){
    res.status(500).json(error);
  }
});

module.exports.handler = serverless(app);