module.exports = {
    name: 'avatar',
    description: "Display user's avatar or mentions avatar",
    execute(message) {
        if (!message.mentions.users.size) { 
            return message.channel.send(`Votre avatar est : ${message.author.displayAvatarURL({format:'png'})}`);
        }
        const avatarList = message.mentions.users.map(user=> {
            return `L'avatar de ${user.name} est : ${user.displayAvatarURL({format:'png'})}`;
        });
        message.channel.send(avatarList);
    }
};