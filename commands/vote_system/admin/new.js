/*
Required parameters:
commands
callback
*/

// Start a new election

module.exports = {
    commands: ["vote_start"],
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