const Dynamo = require("../util/dynamoDB");
const { Group } = require("./group");
const uuid = require('uuid');

const GroupService = {
    groupTable : process.env.GROUP_TABLE,

    async getById(id){
        let res = await Dynamo.get(id, this.groupTable);
        return res;
    },

    async addGroup(data) {
        let group = new Group();
        group.ID = uuid.v4();
        group.ownerID = data.userID;
        group.name = data.name;
        group.userIds = data.userIds ? data.userIds : [];
        group.externalUserIds = data.externalUserIds? data.externalUserIds : [];
        group.globalPermission = data.globalPermission? data.globalPermission: [];
        return await Dynamo.write(group, this.groupTable);
    },

    async update(ID, data) {
        return await Dynamo.update(data, this.groupTable, ID);
    },

    async delete(ID) {
        return await Dynamo.delete(ID, this.groupTable);
    }
}
module.exports = GroupService;
