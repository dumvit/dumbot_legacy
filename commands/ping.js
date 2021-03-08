module.exports = {
    name: 'ping',
    description: 'Ping command.',
    async execute(client, message, args) {
        message.channel.send('Pong!!');
    },
};
