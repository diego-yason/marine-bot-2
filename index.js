const path = require("path");
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

const { PREFIX } = require("./publicConfig.json");
const { DISCORD_KEY } = require("./privateConfig.json");

client.once("ready", () => {
	console.log("Ready!");

    const baseFile = "_command_handler.js";
    const templateFile = "_template.js";
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));

            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile || file !== templateFile) {
                const option = require(path.join(__dirname, dir, file));

                console.log(file, option);

                commandBase(client, option);
            }
        }
    }

    readCommands("commands");
});

client.login(DISCORD_KEY);