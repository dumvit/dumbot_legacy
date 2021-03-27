module.exports = {
    name: 'twitch',
    aliases: ['ttv'],
    description: 'Show the for the twitch channel.',
    async execute(message, args, client) {
        message.channel.send('https://twitch.tv/dumvit');
    },
};
