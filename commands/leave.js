module.exports = {
    name: 'leave',
    aliases: ['disconnect'],
    description: 'Bot leaves the channel.',
    async execute(message, args, client) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.channel.send(
                'You must be in a channel to execute this command.'
            );
        }

        await voiceChannel.leave();
        await message.channel.send('Leaving channel.');
    },
};
