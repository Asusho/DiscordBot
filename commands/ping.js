module.exports = {
    name: 'ping',
    description: "test command",
    execute(message) {
        message.channel.send("pong");
    }
};