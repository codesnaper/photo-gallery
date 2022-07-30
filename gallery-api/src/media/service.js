const Dynamo = require("../util/dynamoDB");
const { Share } = require("./share");
const uuid = require('uuid');

const ShareService = {
    shareTable : process.env.SHARE_TABLE,

    async getById(id){
        let res = await Dynamo.get(id, this.shareTable);
        return res;
    },

    async addShare(data) {

        return await Dynamo.write(gallery, this.shareTable);
    },

    async update(ID, data) {
        return await Dynamo.update(data, this.shareTable, ID);
    },

    async delete(ID) {
        return await Dynamo.delete(ID, this.shareTable);
    }
}
module.exports = ShareService;
