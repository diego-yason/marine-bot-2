const mongoose = require("mongoose");
const submit = require("../commands/submit");

const reqString = {
    type: String,
    required: true,
};

const submitSchema = mongoose.Schema({
    _number: reqString,
    url: reqString,
    primary_sponsor: reqString,
});

module.exports = mongoose.model("legislation", submitSchema);