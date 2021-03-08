module.exports = {
    name: 'twitch',
    description: 'Show the for the twitch channel.',
    async execute(client, message, args) {
        message.channel.send('https://twitch.tv/dumvit');
    },
};
