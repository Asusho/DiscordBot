const fs = require('fs');
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Ready!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Une erreur s'est produite pendant l'execution de la commande");
    }
});



client.on('voiceStateUpdate', (oldMember, newMember) => {

    let userName = newMember.member.user.username;
    console.log(userName);

    if (userName == "IdemXD" || userName == "Asusho") {
        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel


        if (oldUserChannel === undefined && newUserChannel !== undefined) {

            // User Joins a voice channel
            try {
                let mediEvent = require(`./events/medi.js`);
                client.channels.fetch('715594710156050515')
                    .then(textChannel => {
                        mediEvent.execute(newMember.voiceChannel, textChannel);
                    })
                    .catch(console.error);;
            } catch (error) {
                console.error(error);
                message.reply("Une erreur s'est produite pendant l'execution de la commande");
            }


        } else if (newUserChannel === undefined) {

            // User leaves a voice channel

        }
    }
})


client.login(token);