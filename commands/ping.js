module.exports = {
    name: 'ping',
    description: 'Ping command.',
    async execute(message, args, client) {
        message.channel.send('Pong!!');
    },
};
