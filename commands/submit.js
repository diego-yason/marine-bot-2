/*
Required parameters:
commands
callback
*/

module.exports = {
    commands: ["submit"],
    callback: (message, arguments, text) => {
        // TODO:Add accept message
    },
    expectedArgs: "<bill url> <name [optional]>",
    permissionError: "You need to be a member of any of the authorized roles according to the Congressional Code.",
    minArgs: 1,
    maxArgs: 2,
    permissions: [],
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
}