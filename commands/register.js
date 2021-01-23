const Discord = require("discord.js");

module.exports = {
    commands: ["register"],
    callback: (m, args, text) => {
        const { author, channel } = m;

        // TODO: Add a check if the person already has registration 

        // TODO: Get the actual questions
        const questions = [
            "What is your legal (**in RP**) name?",
            "Are you part of any other government?",
            "What government are you part of? (if you aren't in any, type `None`",
        ];
        let counter = 0;

        const filter = message => message.author.id === author.id;

        const collector = new Discord.MessageCollector(channel, filter, {
            max: 3,
            time: 1000 * 30,
        });

        channel.send(questions[counter]);

        collector.on("collect", message => {
            if (counter < questions.length) {
                channel.send(questions[counter++]);
            }
        });

        collector.on("end", (collected, reason) => {
            switch (reason) {
                // TODO: Figure out what the possible reasons are
                case "time":
                    channel.send("Timed out, please retry registration again using the `k!register` command again.");
                    console.log(`Registration of ${author.id} is incomplete, reason: "Timeout"`);
                    break;
                default:
                    console.log(`Reason of MessageCollector end: ${reason}`);
                    console.log(`Registration of ${author.id} is complete.`);
            }
        });
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
};