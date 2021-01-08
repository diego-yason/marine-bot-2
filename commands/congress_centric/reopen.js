/*
Required parameters:
commands
callback
*/

// In case they accidentally close the wrong legislation lol

module.exports = {
    commands: [],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: ["Speaker of the Federalst Congress", "Speaker Pro Tempore"],
}