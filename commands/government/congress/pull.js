module.exports = {
    commands: ["pull"],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "<legislation number>",
    permissionError: "Only sponsors may pull bills. (Submitter)",
    minArgs: 1,
    maxArgs: 1,
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
};