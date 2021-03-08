module.exports = {
    name: 'leave',
    description: 'Bot leaves the channel.',
    async execute(client, message, args) {
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
