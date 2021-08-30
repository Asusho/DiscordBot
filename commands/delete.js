module.exports = {
    name: 'delete',
    description: "Delete messages",
    execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply("Ce n'est pas un nombre valide");
        }
        else if (amount < 1 || amount > 100) {
            return message.reply("Tu doit saisir un nombre entre 1 et 99");
        }

        message.channel.bulkDelete(amount+1)
            .then(messages => console.log(`${messages.size-1} messages supprimés sur le channel ${message.channel.name}`));
    }
};