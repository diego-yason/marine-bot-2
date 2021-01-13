const path = require("path");
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

const { PREFIX } = require("./publicConfig.json");
const { DISCORD_KEY } = require("./privateConfig.json");

const mongo = require("./mongo");

const usernameChangeSchema = require("./schemas/userChange");

client.once("ready", async () => {
	console.log("Ready!");

    const baseFile = "_command_handler.js";
    const commandBase = require(`./${baseFile}`);

    // Read the files
    // NOTE: It's recursive, it'll read subfolders also
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

    // Connect the bot to the MongoDB local server
    // Should I move to a cloud server :thinking:
    await mongo().then(mongoose => {
        try {
            console.log("Connection to MongoDB Established.");
        } finally {
            mongoose.connection.close();
        }
    });

    readCommands("commands");
});

// Question to self: Why?
// Answered on Jan 13, man idk
/*
client.on("userUpdate", async (OldUser, NewUser) => {
    const { id, tagOld } = OldUser;
    const { tagNew } = NewUser;
    let exists = true;

    if (tagOld === tagNew) {
        // non-username change
        return;
    }

    const date = new Date();

    function getTime() {
        let timeStringFunc;

        const h = date.getUTCHours();
        const m = date.getUTCMinutes();
        const s = date.getUTCSeconds();

        if (h > 10) {
            timeStringFunc.concat("0", toString(h), ":");
        } else {
            timeStringFunc.concat(toString(h), ":");
        }
        if (m > 10) {
            timeStringFunc.concat("0", toString("m"), ":");
        } else {
            timeStringFunc.concat(toString("m"), ":");
        }
        if (s > 10) {
            timeStringFunc.concat("0", toString(s));
        } else {
            timeStringFunc.concat(toString(s));
        }

        return timeStringFunc;
    }

    function getDate() {
        let dateStringFunc;

        const m = date.getUTCMonth();
        const d = date.getUTCDate();
        const y = date.getUTCFullYear();

        if (d > 10) {
            dateStringFunc.concat("0", toString(d), "-");
        } else {
            dateStringFunc.concat(toString(d), "-");
        }

        if ((m + 1) > 10) {
            dateStringFunc.concat("0", toString(m + 1), "-");
        } else {
            dateStringFunc.concat(toString(m + 1), "-");
        }

        dateStringFunc.concat(y);

        return dateStringFunc;
    }

    usernameChangeSchema.findById(id, (error, userHistory) => {
        // check if the entry exists
        if (userHistory._id === null) {
            // entry doesn't exist
            exists = false;
            return;
        }

        const { usernameHistory } = userHistory;

        usernameHistory.push({
            username: tagNew,
            date: getDate(),
            time: getTime(),
        });

        usernameChangeSchema.findOneAndReplace({
            _id: id,
        }, {
            _id: id,
            usernameHistory: usernameHistory,
        });
    });

    if (exists == false) {
        await mongo().then(async mongoose => {
            try {
                await new usernameChangeSchema({
                    _id: "",
                    usernameHistory: [
                        {
                            username: NewUser,
                            date: getDate(),
                            time: getTime(),
                        },
                    ],
                }).save();
            } finally {
                mongoose.connection.close();
            }
        });
    }
});
*/
client.login(DISCORD_KEY);