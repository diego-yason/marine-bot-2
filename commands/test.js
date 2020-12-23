module.exports = {
    name: "test",
    description: "Test command, literally just that.",
    args: false,
    cooldown: 0,
    usage: "k!test",
    guildOnly: false,
    permissions: [false],
    execute(message, args) {
        message.channel.send("Tested!");
    },
};