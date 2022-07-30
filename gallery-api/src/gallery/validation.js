const uuid = require('uuid');
const  Validation = {
    isInvalidImage(image){
        return !Array.isArray(image);
    },

    isInvalidMandatoryFilled(req){
        return !req.body.name;
    },

    isImagePresent(req){
        return req.body.image;
    },

    isPostDataValid(req){
        return this.isInvalidMandatoryFilled(req) || (this.isImagePresent(req) && !this.isInvalidImage(req.body.image));
    },

    isvalidId(req){
        return req.params.id && uuid.validate(req.params.id);
    }
};

module.exports = Validation;