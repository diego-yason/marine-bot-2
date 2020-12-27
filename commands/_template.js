/*
Required parameters:
commands
callback
*/

module.exports = {
    commands: [],
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        // put your code here
    },
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: [],
}