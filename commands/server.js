module.exports = {
    name: 'server',
    description: "Display server info",
    execute(message) {
        message.channel.send(`Nom du serveur : ${message.guild.name} \n Nombre d'utilisateur : ${message.guild.memberCount}`);
    }
};