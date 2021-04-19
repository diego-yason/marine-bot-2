"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
var ws = require("ws");
var fs = require("fs");
var axios_1 = require("axios");
var axiosRetry = require("axios-retry");
var discordAxios = axios_1["default"].create({
    baseURL: "https://discord.com/api/v8",
    headers: {
        authorization: "Bot " + process.env.TOKEN
    }
}), APP_ID = "782094351685124146";
axiosRetry(discordAxios, { retries: 3 });
var slash = {};
// setting up monitor
axios_1["default"].post(process.env.MONITOR);
var monitor = setInterval(function () { return axios_1["default"].post(process.env.MONITOR); }, 300000);
function readDir(folderName, lastPath) {
    if (folderName === void 0) { folderName = "commands"; }
    if (lastPath === void 0) { lastPath = "."; }
    var dirPath = lastPath + "/" + folderName;
    var items = fs.readdirSync(dirPath);
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var lstat = fs.lstatSync(dirPath + "/" + item);
        if (lstat.isDirectory()) {
            readDir(item, dirPath);
        }
        else if (lstat.isFile()) {
            registerCommand(dirPath + "/" + item);
        }
    }
}
function registerCommand(filePath) {
    var name = filePath.slice(11, -3);
    slash[name] = require("../build" + filePath);
}
readDir();
// REMINDME this is not a good idea since we're not checking how many shards are available
function startSession(resume, sessionId, lastSeq) {
    if (resume === void 0) { resume = false; }
    return __awaiter(this, void 0, void 0, function () {
        var bot, heartbeat_interval, lastSequence, heartbeat_ack;
        return __generator(this, function (_a) {
            bot = new ws("wss://gateway.discord.gg?v=8");
            heartbeat_ack = false;
            bot.on("open", function () {
                console.log("Open!");
            });
            bot.on("message", function (raw) {
                // d has to be marked as any or else ts will flag some parts of the code below
                // d could either be GatewayHello or Interaction   vvvv
                var _a = JSON.parse(raw), op = _a.op, d = _a.d, EVENT_NAME = _a.t, s = _a.s;
                lastSequence = s;
                switch (op) {
                    case 0: {
                        var data_1 = d;
                        if (EVENT_NAME === "INTERACTION_CREATE") {
                            var intData = data_1.data;
                            var command = void 0;
                            // REMINDME this only handles 1 nested subcommand, not a group
                            // TODO allow this to go through multiple subcommands
                            try {
                                command = intData.name + "/" + intData.options[0].name;
                            }
                            catch (e) {
                                // probably means that theres no subcommand
                                command = intData.name;
                            }
                            discordAxios.post("/interactions/" + data_1.id + "/" + data_1.token + "/callback", {
                                type: 5
                            });
                            var res = {
                                /**
                                 * This will send a plain text reply to Discord. Markdown is supported.
                                 * @param {string} message
                                 */
                                reply: function (message) {
                                    discordAxios.patch("/webhooks/" + APP_ID + "/" + data_1.token + "/messages/@original", {
                                        content: message
                                    });
                                },
                                /**
                                 * This sends an embed to Discord. Follow the structure from Discord. https://discord.com/developers/docs/resources/channel#embed-object
                                 * @param {object} embedData JSON Embed Data. Can be in an array if you want to put multiple embeds. Max of 10.
                                 * @param {string} [message] Optional. Plain text message
                                 */
                                embed: function (embedData, message) {
                                    if (message === void 0) { message = ""; }
                                    // Check if embedData is array
                                    if (!Array.isArray(embedData)) {
                                        [embedData];
                                    }
                                    if (embedData.length > 10) {
                                        throw new TypeError("Too many embeds!");
                                    }
                                    discordAxios.patch("/webhooks/" + APP_ID + "/" + data_1.token + "/messages/@original", {
                                        content: message,
                                        embeds: embedData
                                    });
                                }
                            };
                            try {
                                slash[command](discordAxios, data_1, res);
                            }
                            catch (e) {
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
                            s: (lastSequence) ? lastSequence : null
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
                        var data = d;
                        // Hello!
                        heartbeat_interval = setInterval(function (sequence) {
                            if (!heartbeat_ack) {
                                bot.close(3000);
                                return;
                            }
                            console.log("Sent a heartbeat!");
                            bot.send(JSON.stringify({
                                op: 1,
                                d: (sequence) ? sequence : null
                            }));
                            heartbeat_ack = false;
                        }, data.heartbeat_interval, lastSequence);
                        bot.send(JSON.stringify({
                            op: 1,
                            d: null
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
                                        $device: "NodeJS"
                                    },
                                    intents: process.env.INTENT
                                }
                            }));
                        }
                        else {
                            bot.send(JSON.stringify({
                                op: 6,
                                d: {
                                    token: process.env.TOKEN,
                                    session_id: sessionId,
                                    seq: lastSeq
                                }
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
            bot.on("close", function (code, reason) {
                clearInterval(heartbeat_interval);
            });
            return [2 /*return*/];
        });
    });
}
startSession();
//# sourceMappingURL=index.js.map