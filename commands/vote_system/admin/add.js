/*
Required parameters:
commands
callback
*/

// Add a candidate

module.exports = {
    commands: ["vote_add", "vote_candidate"],
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