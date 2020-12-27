const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready!");
});

client.once("message", message => {
    // !!
});

client.login("NzgyMDk0MzUxNjg1MTI0MTQ2.X8HMIA.gtUwETOrwPLC0krmGUfcxlE48vk");