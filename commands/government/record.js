const rfr = require("rfr");

const mongo = rfr("mongo.js");

const MarineClass = require("@kingmarine/marine-package");

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