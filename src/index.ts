// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import * as ws from "ws";
import * as fs from "fs";
import axios from "axios";
import * as axiosRetry from "axios-retry";

// Custom .d.ts files
import { Interaction } from "../res/interaction";
import { D as GatewayHello } from "../res/gateway-hello";
import { Ready } from "../res/ready";

const discordAxios = axios.create({
          baseURL: "https://discord.com/api/v8",
          headers: {
              authorization: "Bot " + process.env.TOKEN,
          },
      }),
      APP_ID = "782094351685124146";

axiosRetry(discordAxios, { retries: 3 });

interface commands {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key: string]: Function;
}

const slash: commands = {};

type not_exist = null | undefined;

// setting up monitor
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
axios.post(process.env.MONITOR!);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const monitor = setInterval(() => axios.post(process.env.MONITOR!), 300000);

function readDir(folderName = "commands", lastPath = "./build") {
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

function registerCommand(filePath: string) {
    const name = filePath.slice(17, -3);

    slash[name] = require("../" + filePath);
}

readDir();

// REMINDME this is not a good idea since we're not checking how many shards are available
async function startSession(resume = false, sessionId?: string, lastSeq?: number) {
    const bot = new ws("wss://gateway.discord.gg?v=8");

    let heartbeat_interval,
        lastSequence,
        heartbeat_ack = false,
        SESSION_ID: string = sessionId || "";

    bot.on("open", () => {
        console.log("Open!");
    });

    bot.on("message", (raw: never) => {
        // d has to be marked as any or else ts will flag some parts of the code below
        // d could either be GatewayHello or Interaction   vvvv
        const { op, d, t: EVENT_NAME, s } : { op: number, d:never, t: string, s: number } = JSON.parse(raw);

        lastSequence = s;

        switch (op) {
            case 0: {
                switch (EVENT_NAME) {
                    case "INTERACTION_CREATE": {
                        const data: Interaction = d;
                        const intData = data.data;
                        let command;
                        // REMINDME this only handles 1 nested subcommand, not a group
                        // TODO allow this to go through multiple subcommands
                        try {
                            command = `${intData.name}/${intData.options[0].name}`;
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
                            console.log("Command failed! " + command);
                        }

                        console.log("wow an interaction!");
                        break;
                    }
                    case "READY": {
                        const data: Ready = d;
                        SESSION_ID = data.session_id;
                        break;
                    }
                }
                break;
            }
            case 1: {
                // asking for ping
                if (!heartbeat_ack) {
                    bot.close(4001);
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
                console.log("Got a reconnect request");
                bot.close(4000);
                break;
            }
            case 9: {
                // invalid session
                throw new Error("Session was invalid");
            }
            case 10: {
                const data: GatewayHello = d;
                // Hello!
                heartbeat_interval = setInterval(function(sequence : number | not_exist) {
                    if (!heartbeat_ack) {
                        bot.close(4001);
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
                if (resume === false) {
                    bot.send(JSON.stringify({
                        op: 2,
                        d: {
                            token: process.env.TOKEN,
                            properties: {
                                $os: process.platform,
                                $browser: "NodeJS",
                                $device: "NodeJS",
                            },
                            intents: process.env.INTENT,
                        },
                    }));
                } else {
                    bot.send(JSON.stringify({
                        op: 6,
                        d: {
                            token: process.env.TOKEN,
                            session_id: sessionId,
                            seq: lastSeq,
                        },
                    }));
                }
                break;
            }
            case 11: {
                // ack heartbeat
                heartbeat_ack = true;
                break;
            }
        }
    });

    bot.on("close", (code: number, reason = "") => {
        clearInterval(heartbeat_interval);
        heartbeat_interval = undefined;

        if (reason === "reconnect") {
            startSession(true, SESSION_ID, lastSequence);
            console.log("Started a new session!");
        } else {
            throw new Error("Connection closed, code: " + code + " | reason: " + reason);
        }
    });
}

startSession();
console.log("Called start session!");