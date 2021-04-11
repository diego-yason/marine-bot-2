const { isArray } = require("util");

const Discord = require("discord.js"),
      client = new Discord.Client(),
      { TOKEN } = require("./secrets.json"),
      fs = require("fs"),
      axios = require("axios").default.create({
          baseURL: "https://discord.com/api/v8",
          headers: {
              authorization: "Bot " + TOKEN,
          },
      }),
      APP_ID = "782094351685124146";

/**
 * @type {object} Directory for all command callbacks
 */
const slash = {};

/**
 * @type {object} Array of all command callbacks found in the "commands" folder
 */
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const command of commands) {
    const cmd = require("./commands/" + command);
    slash[command] = cmd;
}

client.on("raw", ({ t: EVENT_NAME, d: data, s: seq, op }) => {
    const { options, name } = data.data;
    if (EVENT_NAME === "INTERACTION_CREATE") {
        // Acknoledge the command to Discord
        // Shows the "Bot is Thinking" message
        axios.post(`/interactions/${data.id}/${data.token}/callback`, {
            type: 5,
        });

        const res = {
            /**
             * This will send a plain text reply to Discord. Markdown is supported.
             * @param {string} message
             */
            reply: (message) => {
                axios.patch(`/webhooks/${APP_ID}/${data.token}/messages/@original`, {
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

                axios.post(`/webhooks/${APP_ID}/${data.token}/messages/@original`, {
                    content: message,
                    embeds: embedData,
                });
            },
        };

        try {
            slash[data](axios, data, res); // TODO check Discord docs and see where to get the command called
        } catch (err) {
            // TODO make a reply saying the callback isn't available yet
        }
    }
});

client.login(TOKEN);