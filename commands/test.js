module.exports = {
    commands: ["test", "ping"],
    callback: (message, args, text) => {
        message.reply("Hello");
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: [],
};