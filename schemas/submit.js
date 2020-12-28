const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true,
};

const submitSchema = mongoose.Schema({
    _id: reqString,
    url: reqString,
    primary_sponsor: reqString,
    cosponsor: {
        type:Object,
    },
    bill: {
        type:Object,
    },
});

module.exports = mongoose.model("legislation", submitSchema);