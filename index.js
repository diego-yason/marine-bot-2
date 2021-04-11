const Discord = require("discord.js"),
      client = new Discord.Client(),
      { TOKEN } = require("./secrets.json"),
      fs = require("fs"),
      axios = require("axios").default.create({
          baseURL: "https://discord.com/api/v8",
          headers: {
              authorization: "Bot " + TOKEN,
          },
      });

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
        const res = {
            /**
             * This will send a plain text reply to Discord. Markdown is supported.
             * @param {string} message
             */
            reply: (message) => {
                axios.post();
            },
            /**
             * This sends an embed to Discord. Follow the structure from Discord. https://discord.com/developers/docs/resources/channel#embed-object
             * @param {object} embedData JSON Embed Data
             */
            embed: (embedData) => {
                axios.post();
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