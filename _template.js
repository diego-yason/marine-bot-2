module.exports = {
    commands: [],
    callback: (message, arguments, text) => {
        // put your code here
    },
};

/*

    You can add the following to the table above:

    expectedArgs: String,
    Default: "Expected Args not given in command file."
    Give error message if someone didn't give the right args

    permissionError: String,
    Default: "No permission. Command file doesn't give any error messages, this is just default."
    Give error message if someone doesn't have the right
    permission (discord permission or server role)

    minArgs: Number,
    Default: 0
    Minimum arguments needed

    maxArgs: Number,
    Default: null
    Maximum arguments allowed

    permissions: Object (array),
    Default: []
    Discord permissions required to run command
    See ./discordpermissions.txt

    allPermissions: Boolean
    Default: false
    Require user to have all permissions listed
    in permissions array

    rolePermission: Object (array),
    Default: []
    Role permissions required to run command
    Use exact name of the role

    allRoles: Boolean,
    Default: false
    Require user to have all roles listed in
    rolePermission array

    If you wish to add your own property, you need to also add in some lines in ./_command_handler.js
*/