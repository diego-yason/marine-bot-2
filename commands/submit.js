module.exports = {
    commands: ["submit"],
    args: "<bill url> <name>",
    permissionError: "You need to be a member of any of the authorized roles according to the Congressional Code.",
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        // TODO:Add accept message
    },
    permissions: [],
    rolePermission: [],
}