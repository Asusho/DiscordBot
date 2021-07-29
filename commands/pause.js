module.exports = {
    name: 'pause',
    description: "pause sound",
    async execute(message) {

        if (!message.guild) return;

        const connection = await message.member.voice.channel.join();
    }
};