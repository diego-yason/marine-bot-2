const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    }, // userid??? not sure
    vote: {
        type: Object,
        required: true,
    }, // Vote in array
    /*
        The votes will be in this format, 0 being the 1st preference
        ["KingMarine", "Federalist", "OtherFederalist", "ADrewster"]
    */
    election: {
        type: Number,
        required: true,
    },
});

// CONSIDER: moving this to the main command file
module.exports = mongoose.model("votes", voteSchema);