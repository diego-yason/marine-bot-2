module.exports = {
    name: "restart",
    description: "THIS IS A BOT ADMIN COMMAND | DOES NOT WORK IN NORMAL CIRCUMSTANCES \n This command is used to restart the bot, usually for updates. \n This command is not yet functional.",
    args: false,
    cooldown: 0,
    usage: "k!restart [code]",
    guildOnly: false,
    permissions: ["bot_admin"],
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\``);
    },
};