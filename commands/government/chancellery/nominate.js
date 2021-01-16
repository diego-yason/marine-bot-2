module.exports = {
    commands: ["nominate"],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "<mention> <position>",
    permissionError: "Only the Chancellor may nominate people to the Chancellery.",
    minArgs: 2,
    maxArgs: null,
    rolePermission: ["Supreme Chancellor of the Federalist Republic"],
};