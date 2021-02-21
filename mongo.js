const rfr = require("rfr");

const mongoose = require("mongoose");
const { mongoPath, testEnvMongoPath } = rfr("privateConfig.json");

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose;
};