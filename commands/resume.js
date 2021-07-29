module.exports = {
    name: 'resume',
    description: "resume sound",
    async execute(message) {

        if (!message.guild) return;

        if (message.client.dispatcher) {
            if (message.client.dispatcher.paused) {
                message.client.dispatcher.resume();
            }
            else {
                message.reply('La lecture est déjà en cours');
            }
        }
        else {
            message.reply(`Aucune musique n'est joué actuellement`);
        }

    }
};