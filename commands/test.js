module.exports = {
    name: "test",
    description: "Test command, literally just that.",
    args: false,
    guildOnly: false,
    execute(message, args) {
        message.channel.send("Tested!");
    },
};