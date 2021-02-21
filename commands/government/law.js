const MarineClass = require("@kingmarine/marine-package");
const rfr = require("rfr");

const mongo = rfr("mongo.js");

const { CONGRESS_NUMBER, CONGRESS_SUFFIX } = rfr("privateConfig.json");
async function findBillItem(index) {
    // TODO Do this
}

module.exports = {
    commands: ["enact"],
    expectedArgs: "`k!enact <URL> <Bill Index Number>",
    callback: async (message, args, text) => {
        const { author, member } = message;
        let enacter;

        if (member.roles.cache.has()) {
            enacter = `Chancellor ${author.tag}`;
        } else if (member.roles.cache.has("497747841737949195")) {
            enacter = `${CONGRESS_NUMBER}${CONGRESS_SUFFIX} Congress`;
        } else {
            message.reply("For some reason the bot tried to process the command (after checks) and decided to run the code but you didn't actually have the speaker or chancellor role?");
            return;
        }

        const billObject = await findBillItem(args[1]);

        const law = new MarineClass.Law(billObject.getName(), args[0], billObject, enacter);
    },
    serverOnly: true,
    rolePermission: ["Supreme Chancellor of the Federalist Republic", "Speaker of the Federalist Congress"],
    minArgs: 2,
    maxArgs: 2,
};