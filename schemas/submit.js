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
    type: reqString,
    name: {
        type:String,
    },
});

// TODO: Add options for flexibility
module.exports = mongoose.model("legislations", submitSchema);