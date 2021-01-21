const { CONGRES_NUMBER } = require("../../../publicConfig.json");

module.exports = {
    commands: ["pull"],
    callback: (message, args, text) => {
        const numbers = args[1]. split("-")

        if (CONGRES_NUMBER != numbers[0]) {
            // not current congress bill
            message.reply("This legislation is not from the current congress.")
            return;
        }

        // TODO: Check for sponsor
    },
    expectedArgs: "<legislation number>",
    permissionError: "Only sponsors may pull bills. (Submitter)",
    minArgs: 2,
    maxArgs: 2,
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
};