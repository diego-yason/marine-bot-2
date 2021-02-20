const rfr = require("rfr");

const mongoose = require("mongoose");
const { mongoPath } = rfr("privateConfig.json");

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose;
};