const Dynamo = require("../../util/dynamoDB");
const { Gallery } = require("../modal/Gallery");

const galleryTable = process.env.GALLERY_TABLE;
exports.addGallery =  (data)=> {
    return new Promise((resolve, reject) => {
        let gallery = new Gallery();
        gallery.ID = 1;
        gallery.name = data.name ? data.name: '';
        gallery.date = data.date ? data.date: new Date().getDate();
        gallery.images = data.images ? data.images: [];
        Dynamo.write(gallery, galleryTable)
            .then(data => resolve(data))
            .catch(err => {console.error(err);reject(err)});
    });
    
}