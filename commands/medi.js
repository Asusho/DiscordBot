module.exports = {
    name: 'medi',
    description: "play medi entrance",
    async execute(message) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            message.channel.send({
                files: [{
                    attachment: './Medias/Medi_Entrance_short2.gif',
                    name: 'Medi_Entrance.gif'
                }]
            });


            const connection = await message.member.voice.channel.join();
            // const dispatcher = connection.play('./Medias/Medi_Entrance_short.mp3', {
            //     volume: 0.5,
            // });
            const dispatcher = connection.play('./Medias/pornhub-intro.mp3', {
                volume: 0.5,
            });
            message.client.dispatcher = dispatcher;

            dispatcher.on('start', () => {
                message.client.user.setActivity('Welcome Medi !', { type: "CUSTOM_STATUS" });
            });

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy(); // end the stream
                message.member.voice.channel.leave();
                message.client.dispatcher = null;
                message.client.user.setActivity();
            });

            dispatcher.on('error', () => {
                message.reply("J'ai pas reussi a bien accueillir Medi");
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