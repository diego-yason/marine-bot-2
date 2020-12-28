/*
Required parameters:
commands
callback
*/

const mongo = require("../mongo");
const schema = require("../schemas/submit");

module.exports = {
    commands: ["submit"],
    callback: async (message, arguments, text) => {
        const { member } = message;

        await mongo().then(async mongoose => {
            try {
                await new schema({
                    _number: "1000",
                    url: "test",
                    primary_sponsor: "TestUser",
                });
                console.log("Added new data");
            } catch (e) {
                console.log("wait nevermined, theres an error" + e);
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