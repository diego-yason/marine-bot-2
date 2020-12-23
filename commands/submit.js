module.exports = {
    name: "submit",
    description: "Permission Level: Congressperson or Chancellor \n Submits a bill to Congress",
    args: true,
    cooldown: 0,
    usage: "k!submit www.docs.google.com",
    guildOnly: true,
    permissions: [true, "497744879934373898", "483775223154606101"],
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\``);
    },
};