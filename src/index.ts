// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import ws from "ws";
import * as fs from "fs";
import axios from "axios";
import axiosRetry from "axios-retry";

const TOKEN = process.env.TOKEN,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      discordAxios = axios.create({
          baseURL: "https://discord.com/api/v8",
          headers: {
              authorization: "Bot " + TOKEN,
          },
      }),
      APP_ID = "782094351685124146";

axiosRetry(discordAxios, { retries: 3 });

interface commands {
    [key: string]: Function;
}
const slash = {};

type not_exist = null | undefined;

// setting up monitor
axios.post(process.env.MONITOR!);

const monitor = setInterval(() => axios.post(process.env.MONITOR!), 300000);

function readDir(folderName = "commands", lastPath = ".") {
    const dirPath = `${lastPath}/${folderName}`;
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const lstat = fs.lstatSync(`${dirPath}/${item}`);
        if (lstat.isDirectory()) {
            readDir(item, dirPath);
        } else if (lstat.isFile()) {
            registerCommand(`${dirPath}/${item}`);
        }
    }
}

function registerCommand(filePath) {
    const name = filePath.slice(11, -3);

    slash[name] = require("../" + filePath);
}

readDir();

// REMINDME this is not a good idea since we're not checking how many shards are available
const bot = new ws("wss://gateway.discord.gg?v=8");

let heartbeat_interval,
    lastSequence,
    heartbeat_ack = false;

bot.on("open", () => {
    console.log("Open!");
});

bot.on("message", (raw) => {
    const { op, d: data, t: EVENT_NAME, s } = JSON.parse(raw);

    lastSequence = s;

    switch (op) {
        case 0: {
            if (EVENT_NAME === "INTERACTION_CREATE") {
                const intData = data.data;
                let command;
                // REMINDME this only handles 1 nested subcommand, not a group
                // TODO allow this to go through multiple subcommands
                try {
                    if (intData.options[0] === 1) {
                        // its a subcommand
                        command = `${intData.name}/${intData.options[0].name}`;
                    }
                } catch (e) {
                    // probably means that theres no subcommand
                    command = intData.name;
                }

                discordAxios.post(`/interactions/${data.id}/${data.token}/callback`, {
                    type: 5,
                });

                const res = {
                    /**
                     * This will send a plain text reply to Discord. Markdown is supported.
                     * @param {string} message
                     */
                    reply: (message) => {
                        discordAxios.patch(`/webhooks/${APP_ID}/${data.token}/messages/@original`, {
                            content: message,
                        });
                    },
                    /**
                     * This sends an embed to Discord. Follow the structure from Discord. https://discord.com/developers/docs/resources/channel#embed-object
                     * @param {object} embedData JSON Embed Data. Can be in an array if you want to put multiple embeds. Max of 10.
                     * @param {string} [message] Optional. Plain text message
                     */
                    embed: (embedData, message = "") => {
                        // Check if embedData is array
                        if (!Array.isArray(embedData)) {
                            [embedData];
                        }

                        if (embedData.length > 10) {
                            throw new TypeError("Too many embeds!");
                        }

                        discordAxios.patch(`/webhooks/${APP_ID}/${data.token}/messages/@original`, {
                            content: message,
                            embeds: embedData,
                        });
                    },
                };

                try {
                    slash[command](discordAxios, data, res);
                } catch (e) {
                    // i don't really care about this yet
                }

                console.log("wow an interaction!");
            }
            // event
            break;
        }
        case 1: {
            // asking for ping
            if (!heartbeat_ack) {
                bot.close(3000);
            }

            console.log("Sent a heartbeat!");

            bot.send(JSON.stringify({
                op: 1,
                s: (lastSequence) ? lastSequence : null,
            }));
            heartbeat_ack = false;
            break;
        }
        case 7: {
            // reconnect request
            console.log("Got a reconnect request, closing bot because I can't handle it");
            throw new Error("Reconnect request received");
        }
        case 9: {
            // invalid session
            throw new Error("Session was invalid");
        }
        case 10: {
            // Hello!
            heartbeat_interval = setInterval(function(sequence : number | not_exist) {
                if (!heartbeat_ack) {
                    bot.close(3000);
                    return;
                }

                console.log("Sent a heartbeat!");

                bot.send(JSON.stringify({
                    op: 1,
                    d: (sequence) ? sequence : null,
                }));

                heartbeat_ack = false;
            }, data.heartbeat_interval, lastSequence);

            bot.send(JSON.stringify({
                op: 1,
                d: null,
            }));

            console.log("Sending identify!");
            bot.send(JSON.stringify({
                op: 2,
                d: {
                    token: TOKEN,
                    properties: {
                        $os: process.platform,
                        $browser: "NodeJS",
                        $device: "NodeJS",
                    },
                    intents: process.env.INTENT,
                },
            }));
            break;
        }
        case 11: {
            // ack heartbeat
            heartbeat_ack = true;
            break;
        }
    }
});

bot.on("close", (code, reason) => {
    clearInterval(heartbeat_interval);
    clearInterval(monitor);

    // very lazy approach but couldn't bother right now
    // TODO when reconnecting is possible, do that
    throw new Error("connection closed? Error msg: " + reason);
});