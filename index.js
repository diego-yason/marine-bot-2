const path = require("path");
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

const { PREFIX } = require("./publicConfig.json");
const { DISCORD_KEY } = require("./privateConfig.json");
const mongo = require("./mongo");

client.once("ready", async () => {
	console.log("Ready!");

    const baseFile = "_command_handler.js";
    const commandBase = require(`./${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));

            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else {
                const option = require(path.join(__dirname, dir, file));

                console.log(file, option);

                commandBase(client, option);
            }
        }
    };

    await mongo().then(mongoose => {
        try {
            console.log("Connection to MongoDB Established.");
        } finally {
            mongoose.connection.close();
        }
    });

    readCommands("commands");
});

client.login(DISCORD_KEY);