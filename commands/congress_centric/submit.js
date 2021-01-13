/*
Required parameters:
commands
callback
*/

const { Schema } = require("mongoose");
const mongo = require("../../mongo");
const schema = require("../../schemas/submit");

const { CONGRESS_NUMBER } = require("../../publicConfig.json");

const localSchema = new Schema({ type: String });

module.exports = {
    commands: ["submit"],
    callback: async (message, args, text) => {
        const { member } = message;

        args[0] = args[0].toLowerCase();

        // check if the submitter has the foresight to use the whole word
        if (args[0] !== "resolution" && args[0] !== "amendment" && args[0] !== "bill") {
            switch (args[0]) {
                case "a":
                    args[0] = "amendment";
                    break;
                case "b":
                    args[0] = "bill";
                    break;
                case "r":
                    args[0] = "resolution";
                    break;
                default:
                    message.reply("Error 5: Incorrect argument for <type>.\nValid arguments:\n`a` for amendments\n`b` for bills\n`r` for resolutions.\nNote: If you want, you can type the whole word instead of the letter.");
                    return;
            }
        }

        await mongo().then(async mongoose => {
            const model = (await mongo()).model('legislation', localSchema);
            const count = await model.countDocuments({ type: args[0] }) + 1;
            
            // this is required because of i use slice and 
            // i moved some code around in this section
            const typeWhole = args[0];
            const typeLetter = args[0].slice(0, 1).toUpperCase();
            console.log(count);
            try {
                await new schema({
                    _id: "C." + args[0].slice(0, 1).toUpperCase() + ". " + CONGRESS_NUMBER + "-" + count,
                    congress: 6,
                    type: args[0],
                    url: args[1],
                    name: args.splice(0, 2).join(" "),
                    primary_sponsor: member.id,
                }).save();
                console.log("Added new data");
            } catch(e) {
                message.channel.send(`Error occured: ${e} | Calling <@197305044834451456>`);
            } finally {
                message.reply(`${typeWhole.toUpperCase()} submitted! The ${typeWhole} is now marked as "C.${typeLetter}. ${CONGRESS_NUMBER}-${count}`);
                mongoose.connection.close();
            }
        });
    },
    expectedArgs: "<type> <url> <name [optional]>",
    help: "For the `type` argument, you can use the following options:",
    permissionError: "You need to be a member of any of the authorized roles according to the Congressional Code.",
    minArgs: 2,
    maxArgs: null,
    permissions: [],
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
};