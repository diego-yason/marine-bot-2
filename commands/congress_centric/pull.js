/*
Required parameters:
commands
callback
*/

module.exports = {
    commands: [],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "",
    permissionError: "Only sponsors may pull bills. (Submitter)",
    minArgs: 0,
    maxArgs: null,
    permissions: [], // discord permissions, check discordpermissions.txt for the list
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
}