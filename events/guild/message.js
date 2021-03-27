const Discord = require('discord.js');

/**
 *
 * @param {Discord} discord
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @returns
 */
module.exports = (discord, client, message) => {
    const PREFIX = process.env.PREFIX;

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
        client.commands.get(cmd) ||
        client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    if (command) command.execute(message, args, cmd, client, discord);
};
