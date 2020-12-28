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

// TODO: Add options for flexibility
module.exports = mongoose.model("legislations", submitSchema);