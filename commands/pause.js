module.exports = {
    name: 'pause',
    description: "pause sound",
    async execute(message) {

        if (!message.guild) return;

        if (message.client.dispatcher) {
            if (!message.client.dispatcher.paused) {
                message.client.dispatcher.pause();
            }
            else {
                message.reply('La lecture est déjà en pause');
            }

        }
        else {
            message.reply(`Aucune musique n'est joué actuellement`);
        }

    }
};