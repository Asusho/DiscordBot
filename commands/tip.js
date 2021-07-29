module.exports = {
    name: 'tip',
    description: "play tip sound",
    async execute(message) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('./Medias/tip.mp3', {
                volume: 0.5,
            });
            message.client.dispatcher = dispatcher;

            dispatcher.on('start', () => {
                message.client.user.setActivity('Tipping', { type: "CUSTOM_STATUS" });
            });

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
                message.client.dispatcher = null;
                message.client.user.setActivity();
            });

            dispatcher.on('error', () => {
                message.reply("Je n'ai pas reussi a tipper");
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