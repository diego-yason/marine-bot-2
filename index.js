const Discord = require("discord.js"),
      client = new Discord.Client(),
      { TOKEN } = require("./secrets.json"),
      fs = require("fs"),
      slash = {},
      axios = require("axios").default.create({
          baseURL: "https://discord.com/api/v8",
          headers: {
              authorization: "Bot " + TOKEN
          }
      });

// just spitballing ideas right now, its 3:39am

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const command of commands) {
    const cmd = require("./commands/" + command);
    slash[command] = cmd;
}

client.on("raw", (e) => {
    if (e.d === "INTERACTION_CREATE") {
        try {
            slash[e.d.name]; // TODO check Discord docs and see where to get the command called
        } catch (e) {
            // TODO make a reply saying the callback isn't available yet
        }
    }
});

client.login(TOKEN);