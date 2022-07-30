const Dynamo = require("../../util/dynamoDB");
const { Gallery } = require("../modal/Gallery");
const uuid = require('uuid');
const galleryTable = process.env.GALLERY_TABLE;


const addGallery =  (data)=> {
    return new Promise((resolve, reject) => {
        let gallery = new Gallery();
        gallery.ID = uuid.v4();
        gallery.name = data.name ? data.name: '';
        gallery.date =  new Date().toLocaleDateString("en-US");
        gallery.images = data.images ? data.images: [];
        Dynamo.write(gallery, galleryTable)
            .then(data => resolve(data))
            .catch(err => {console.error(err);reject(err)});
    });
}

const getById =  (id) => {
    return new Promise((resolve, reject) =>{
        Dynamo.get(id, galleryTable)
            .then(data => resolve(data))
            .catch(err => {console.error(err);reject(JSON.stringify(err))});
    })
}

const update = (ID, data) => {
    return new Promise((resolve, reject) => {
        Dynamo.update(data, galleryTable, ID)
        .then(data => resolve(data))
        .catch(err => {console.error(err);reject(err)});
    });
}

module.exports = {
    addGallery,
    getById,
    update
}