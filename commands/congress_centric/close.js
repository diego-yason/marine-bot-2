/*
Required parameters:
commands
callback
*/

module.exports = {
    commands: [],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "<number> <result `(p)assed | (f)ailed | (t)abled> <additional details (optional)>",
    permissionError: "Only the Speaker and their deputies may declare legislation closed.",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: ["Speaker of the Federalst Congress", "Speaker Pro Tempore"],
}