/*
Required parameters:
commands
callback
*/

const mongo = require("../../mongo");
const schema = require("../../schemas/vote");

module.exports = {
    commands: [],
    callback: async (message, args, text) => {
        // TODO: Modify async function for the vote command
        await mongo().then(async mongoose => {
            const model = mongoose.model("legislation", localSchema);
                model.countDocuments({ type: args[0] }, async (err, countDoc) => {
                    console.log(countDoc);
                    const count = countDoc + 1;
                    try {
                        await new schema({
                            _id: "", // TODO: Determine what to use for id
                            vote: ["votes!!"], // TODO: Add vote
                        }).save();
                        console.log("Added new data");
                    } finally {
                        mongoose.connection.close();
                    }
            });
        });
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: [],
}