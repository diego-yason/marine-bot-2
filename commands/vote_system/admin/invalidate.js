/*
Required parameters:
commands
callback
*/

// Invalidate a vote for any reason
// TODO: Notify voter if this happens

module.exports = {
    commands: ["vote_invalidate"],
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