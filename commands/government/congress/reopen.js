// In case they accidentally close the wrong legislation lol

module.exports = {
    commands: ["reopen"],
    callback: (message, arguments, text) => {
        // put your code here
    },
    expectedArgs: "<legislation number>",
    permissionError: "",
    minArgs: 1,
    maxArgs: 1,
    rolePermission: ["Speaker of the Federalst Congress", "Speaker Pro Tempore"],
};