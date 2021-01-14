/* eslint-disable prefer-const */
const { Error } = require("mongoose");
const { PREFIX } = require("./publicConfig.json");

const validatePermissions = (permissions) => {
    // This is a list of all discord-level
    // permissions, use this for stuff that
    // you want to check that those using the command
    // already can do by themselves
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MEMBERS",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ];

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Error 0: Permission "${permission}" doesn't exist.`);
        }
    }
};

module.exports = (client, commandOptions) => {
    // if you add in another property, make sure you
    // add it into this, if there is a default
    // value you want to use, do something like
    // SpecialProperty = null,
    // otherwise just make it
    // SpecialProperty
    let {
        commands,
        callback,
        expectedArgs = "Expected Args not given in command file.",
        permissionError = "No permission. Command file doesn't give any error messages, this is just default.",
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        rolePermission = [],
        allPermissions = false,
        allRoles = false,
    } = commandOptions;

    // make stuff into an array
    // commands
    if (typeof commands === "string") {
        commands = [commands];
    } else if (typeof commands != "object") {
        throw new Error("Error: Command is invalid, commandOptions:" + commandOptions + "\n Must be a string or array");
    }

    // permissions
    if (permissions.length) {
        // convert to array
        if (typeof permissions === "string") {
            permissions = [permissions];
        // if permissions isn't a string or array
        } else if (typeof permissions != "object") {
            throw new Error(`ERROR: ${commands[0]}'s permissions value is not a string or array`);
        }

        validatePermissions(permissions);
    }

    // discord roles
    if (rolePermission.length) {
        // convert to array
        if (typeof rolePermission == "string") {
            rolePermission = [rolePermission];
        // if permissions isn't a string or array
        } else if (typeof rolePermission != "object") {
            throw new Error(`ERROR: ${commands[0]}'s rolePermission value is not a string or array`);
        }
    }

    // TYPE CHECK SECTION
    // if you're adding a special property and would like
    // to type check, this is the place to put it

    // minArgs's default is 0, so if you didn't do anything,
    // this shouldn't be a problem
    if (typeof minArgs != Number) {
        throw new Error(`ERROR: ${commands[0]}'s minArgs value is not a number.`);
    }

    // if maxArgs isn't a number or null ("undefined")
    if (typeof maxArgs != Number || typeof maxArgs != undefined) {
        throw new Error(`ERROR: ${commands[0]}'s maxArgs value is not null or a number.`);
    }

    // callback check
    if (typeof callback != "function") {
        throw new Error(`ERROR: ${commands[0]}'s callback is invalid.`);
    }

    if (typeof allRoles != "boolean") {
        throw new Error(`ERROR: ${commands[0]}'s allRoles value is not a boolean`);
    }

    if (typeof allPermissions != "boolean") {
        throw new Error(`ERROR: ${commands[0]}'s allPermissions value is not a boolean`);
    }

    // Everything seems to be in order

    console.log(`Registering command: ${commands[0]}`);

    client.on("message", message => {

        // I was today years old (December 27, 2020) that you can do this
        // makes my life WAYYYY easier
        const { member, content, guild } = message;

        // check the command name and alias
        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${PREFIX}${alias.toLowerCase()}`)) {
                // How nice, they actually ran a command

                // check if the member has the correct permissions
                // it gets skipped if its an empty array
                // TODO: Add support for allPermissions
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                // check if the member has the role/s needed
                // hasRole so member only needs one of the roles
                // If you want to require all roles, this section
                // has to be updated to accept an option
                // TODO: Add support for allRoles
                let hasRole = false;

                for (const roleRequired of rolePermission) {
                    const role = guild.roles.cache.find(guildRole => guildRole.name === roleRequired);

                    // if the role doesn't exist
                    if (!role && hasRole == false) {
                        message.reply("Error 1: Role does not exist, ask your admin to create the role required.");
                        return;
                    }

                    // the role exists and the member has it
                    if (member.roles.cache.has(role.id)) {
                        hasRole = true;
                        console.log("yeah the dude got a role");
                    }
                }

                // Member has none of the roles, command not granted
                if (hasRole == false && rolePermission.length > 0) {
                    message.reply("Error 2: You do not have the required role.");
                    return;
                }

                console.log("command is authorized for processing");

                // END OF CHECKER, ACTUAL CODE RUNS BELOW

                // make args
                const args = content.split(/[ ]+/);

                // remove the command, doesn't matter anymore
                args.shift();

                // not enough args
                if (args.length < minArgs) {
                    message.reply(`Error 3: You did not give enough arguments.\n Correct usage: \`${PREFIX}${alias} ${expectedArgs}\``);
                    return;
                }

                // too many args
                if (maxArgs != null && args.length > maxArgs) {
                    message.reply(`Error 4: You have too many arguments.\n Correct usage: \`${PREFIX}${alias} ${expectedArgs}\``);
                    return;
                }

                // command
                callback(message, args, args.join(" "));

                return;
            }
        }
    });
};