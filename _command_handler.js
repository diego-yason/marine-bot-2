/* eslint-disable prefer-const */
const { PREFIX } = require("./publicConfig.json");

const validatePermissions = (permissions) => {
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
    let {
        commands,
        expectedArgs = "",
        permissionError = "No.",
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        rolePermission = [],
        callback,
    } = commandOptions;

    // make stuff into an array
    // commands
    if (typeof commands === "string") {
        commands = [commands];
    }

    try {
        console.log(`Registering command: ${commands[0]}`);
    } catch {
        console.log(`REGISTRATION FAILED | FILE: ${commands[0]}`);
    }

    // permissions
    if (permissions.length) {
        if (typeof permissions === "string") {
            permissions = [permissions];
        }

        validatePermissions(permissions);
    }

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