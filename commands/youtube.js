module.exports = {
    name: 'youtube',
    description: "Play the given youtube video",
    async execute(message, args) {
        if (!message.guild) return;
        if (args.length != 1) {
            message.reply("Il me faut un lien");
            return;
        }

        if (message.client.dispatcher) {
            message.client.dispatcher.destroy(); // end the stream
            message.client.dispatcher = null;
            message.client.user.setActivity();
        }

        if (message.member.voice.channel) {

            const ytdl = require('ytdl-core');

            let volume = message.client.volume / 100;
            console.log(" volume " + volume);

            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(ytdl(args[0], {
                filter: 'audioonly',
                volume: volume,
            }));

            dispatcher.setVolume(volume);

            message.client.dispatcher = dispatcher;

            dispatcher.on('start', () => {
                message.client.user.setActivity('Youtube', { url: args[0], type: "LISTENING" });
                console.log("musique lancer avec le volume " + dispatcher.volume);
            });

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
                message.client.dispatcher = null;
                message.client.user.setActivity();
            });

            dispatcher.on('error', () => {
                message.reply("Je n'ai pas reussi a lire cette vidéo");
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
                message.client.dispatcher = null;
                message.client.user.setActivity();
            });

        } else {
            message.reply(`Tu dois d'abord rejoindre un salon vocal`);
        }
    }
};