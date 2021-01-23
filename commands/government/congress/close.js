const rfr = require("rfr");
const mongoose = require("mongoose");
const mongo = rfr("mongo.js");

module.exports = {
    commands: ["close"],
    callback: async (message, arguments, text) => {
        await mongo().then(async mongo => {
            
        })
    },
    expectedArgs: "<number> <result `(p)assed | (f)ailed | (t)abled`> <additional details (optional)>",
    permissionError: "Only the Speaker and their deputies may declare legislation closed.",
    minArgs: 2,
    rolePermission: ["Speaker of the Federalst Congress", "Speaker Pro Tempore"],
};