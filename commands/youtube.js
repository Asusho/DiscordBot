module.exports = {
    name: 'youtube',
    description: "play youtube video",
    async execute(message, args) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            const ytdl = require('ytdl-core');

            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(ytdl(args[0], {
                 filter: 'audioonly',
                 volume: 0.5 
                }));

            dispatcher.on('start', () => {
                message.client.user.setActivity('Youtube', { type: "LISTENING" });
            });

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
            });

            dispatcher.on('error', () => {
                message.reply("Je n'ai pas reussi a lire cette vidéo");
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
};