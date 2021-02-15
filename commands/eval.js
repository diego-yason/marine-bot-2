// yes i know this is a big security risk
// this is restricted to me only (and fed)

module.exports = {
    commands: ["eval"],
    callback: (message, args, text) => {
        const { author } = message;

        if (author.id === 197305044834451456 || author.id === 771478710678716476) {
            eval(text);
        }
    },
    expectedArgs: "",
    permissionError: "",
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    rolePermission: [],
};