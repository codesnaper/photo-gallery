const Dynamo = require("../../util/dynamoDB");

const getById =  (id) => {
    return new Promise((resolve, reject) =>{
        Dynamo.get(gallery, galleryTable)
            .then(data => resolve(data))
            .catch(err => {console.error(err);reject(err)});
    })
}


export default {
    getById
}