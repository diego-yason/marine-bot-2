module.exports = {
    commands: ["echo"],
    callback: (message, args, text) => {
        const { channel, author } = message;

        console.log(`Echo command used, ${text}, by ${author.id}`);
        channel.send(text);
        message.delete();
    },
};