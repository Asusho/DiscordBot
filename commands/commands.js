module.exports = {
    name: 'commands',
    description: "display list of commands",
    execute(message) {
        const { prefix } = require('../config.json');
        const commands = message.client.commands;
        var res = "";
        commands.forEach(command => {
            res += `${prefix}${command.name} => ${command.description}\n`;
        });
        message.channel.send(res);
    }
};