const Dynamo = require("../util/dynamoDB");
const { Gallery } = require("./gallery");
const uuid = require('uuid');

const GalleryService = {
    galleryTable : process.env.GALLERY_TABLE,

    async getById(id){
        let res = await Dynamo.get(id, this.galleryTable);
        return res;
    },

    async addGallery(data) {
        let gallery = new Gallery();
        gallery.ID = uuid.v4();
        gallery.name = data.name ? data.name: '';
        gallery.date =  new Date().toLocaleDateString("en-US");
        gallery.images = data.images ? data.images: [];
        return await Dynamo.write(gallery, this.galleryTable);
    },

    async update(ID, data) {
        return await Dynamo.update(data, this.galleryTable, ID);
    },

    async delete(ID) {
        return await Dynamo.delete(ID, this.galleryTable);
    }
}
module.exports = GalleryService;
