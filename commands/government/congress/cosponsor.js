module.exports = {
    commands: ["cosponsor"],
    callback: async (message, args, text) => {
        
    },
    expectedArgs: "<legislation number>",
    help: "You must be a member of Congress to run this command.",
    permissionError: "You need to be a member of any of the authorized roles according to the Congressional Code.",
    minArgs: 2,
    rolePermission: ["Federalist Representative", "Supreme Chancellor of the Federalist Republic"],
};