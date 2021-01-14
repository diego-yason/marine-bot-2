/*
Required parameters:
commands
callback
*/

module.exports = {
    commands: ["close"],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "<number> <result `(p)assed | (f)ailed | (t)abled> <additional details (optional)>",
    permissionError: "Only the Speaker and their deputies may declare legislation closed.",
    minArgs: 2,
    rolePermission: ["Speaker of the Federalst Congress", "Speaker Pro Tempore"],
};