/*
Required parameters:
commands
callback
*/

const mongo = require("../mongo");
const schema = require("../schemas/submit");

module.exports = {
    commands: ["submit"],
    callback: async (message, args, text) => {
        const { member } = message;

        await mongo().then(async mongoose => {
            try {
                await new schema.findOneAndUpdate({
                    // find the document if there is one using the key
                    _id: "",
                }, {
                    _id: "",
                    // TODO: Make an ID for legislation
                    // Idea: Type Congress-Number (C.B. 6-01)
                    url: args[0],
                    primary_sponsor: member.id,
                }, {
                    upsert: true,
                });
                console.log("Added new data");
            } finally {
                mongoose.connection.close();
            }
        });
    },
    expectedArgs: "<bill url> <name [optional]>",
    permissionError: "You need to be a member of any of the authorized roles according to the Congressional Code.",
    minArgs: 1,
    maxArgs: 2,
    permissions: [],
    rolePermission: [],
};