module.exports = {
    name: 'resouend',
    description: "send resouend img",
    execute(message) {
        message.channel.send("Ils résouend", {tts: true, files: ["./Medias/resouend.png"]});
    }
};