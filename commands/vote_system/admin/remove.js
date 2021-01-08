/*
Required parameters:
commands
callback
*/

// Remove a candidate from the election

module.exports = {
    commands: ["vote_remove"],
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