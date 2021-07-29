module.exports = {
    name: 'stop',
    description: "stop sound",
    async execute(message) {

        if (!message.guild) return;

        if (message.client.dispatcher) {
            message.client.dispatcher.destroy(); // end the stream
            message.member.voice.channel.leave();
            message.client.dispatcher = null;
            message.client.user.setActivity();
        }
        else {
            message.reply(`Aucune musique n'est joué actuellement`);
        }

    }
};