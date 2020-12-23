const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

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
    let allowed;
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

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown) * 1000;

        switch (command.permissions[0]) {
            case "bot_admin":
                // bot admins only [me]
                if (!message.author.id === "197305044834451456") {
                    message.reply("Invalid: Not a bot admin.");
                    return;
                }
                break;
            case "server_admin":
                // server admins only
                break;
            case true:
                // there are permission roles, but its to specific roles
                for (let i = 1; i < command.permissions.length; i++) {
                    allowed = false;
                    if (message.guild.members.fetch(message.author.id).roles.cache.has(command.permissions[i])) {
                        allowed = true;
                        i = command.permissions.length;
                    }
                }
                break;
            case false:
                // open to everyone
                break;
            default:
                // assume its open to everyone
                break;
        }

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                allowed = false;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        // idk what im doing, this is just in case it tries to run a code that they aren't allowed to
        if (allowed == false) {
            return;
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