const rfr = require("rfr");

const mongo = rfr("mongo.js");

// REMINDME to switch require to rfr again
const MarineClass = require("../../constructors");

module.exports = {
    commands: ["record"],
    expectedArgs: "k!record <department>",
    callback: (message, args, text) => {
        const newDoc = new MarineClass.GovDocument()
    },
    rolePermission: [
        "Speaker of the Federalist Congress", 
        "Members of the Chancellery", 
        "Chief Justice",
    ],
    active: false,
};