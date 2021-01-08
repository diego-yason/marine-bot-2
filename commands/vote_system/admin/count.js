/*
Required parameters:
commands
callback
*/

// Count the ballots (oh no)

module.exports = {
    commands: ["vote_count"],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: [],
}