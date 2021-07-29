module.exports = {
    name: 'volume',
    description: "set volume",
    async execute(message, args) {

        if (!message.guild) return;

        if (args.length != 1 || args[0] < 0 || args[0] > 100) {
            message.reply('Il me faut une valeur entre 0 et 100');
            return;
        }

        if (message.client.dispatcher) {
            message.client.dispatcher.setVolume(args[0]/100);
            message.reply(`Volume à ${args[0]}%`);
        }
        else {
            message.reply(`Aucune musique n'est joué actuellement`);
        }

    }
};