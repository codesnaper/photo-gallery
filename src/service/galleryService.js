import { Configuration } from "../conf";
import { Gallery } from "../modal/gallery";
import { Image, Media } from "../modal/multimedia";

export class GalleryService {

    constructor(){
    }

    getUrl(){
        let url ;
        if(Configuration.profile === 'local') {
            url = fetch('mock/gallery.json'
                ,{
                  headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
                }
              );
        }
        return url;
    }

    getGallery(){
        return new Promise((resolve, reject) => {
            this.getUrl().then(res => res.json())
            .then(data => {
                let galleries = [];
                data.forEach(galleryResponse => {
                    let gallery = new Gallery();
                    gallery.name = galleryResponse.name;
                    gallery.date = galleryResponse.date;
                    gallery.image = [];
                    galleryResponse.images.forEach(img => {
                        let media = new Media();
                        media.name = img.name;
                        media.alt = img.alt;
                        media.role = img.role;
                        media.src = img.src;
                        media.isImage = img.isImage;
                        gallery.image.push(media);
                    })
                    galleries.push(gallery);  
                });
                resolve(galleries);
            }).catch(err => alert(JSON.stringify(err)));
        })
    }

}