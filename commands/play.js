module.exports = {
    name: 'play',
    description: "play sound",
    async execute(message, args) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(args[0], {
                volume: 0.5,
            });

            dispatcher.on('start', () => {
                message.client.user.setActivity('Music', { type: "LISTENING" });
            });

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
};