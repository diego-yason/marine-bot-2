const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const PREFIX = "k!";

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // new item in the collection
    client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log("Ready!");
});

client.once("message", message => {
    // check if the message is using the kingmarine-certified prefix B)
    if (message.content.startsWith(PREFIX)) {
        message.content.slice(PREFIX.length);

        const args = message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // if the command made doesn't exist, just leave
        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(command);

        if (command.args && !args.length) {
            return message.reply("Arguments are required, you didn't add any arguments.");
        }

        if (command.guildOnly && message.channel.type == "dm") {
            return message.reply("This command is not available in DMs");
        }

        

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There is an error, if you think something went wrong, message KingMarine.");
        }
    }
});

client.login("NzgyMDk0MzUxNjg1MTI0MTQ2.X8HMIA.gtUwETOrwPLC0krmGUfcxlE48vk");