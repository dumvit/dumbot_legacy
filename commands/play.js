const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Joins your channel and plays a music from youtube.',
    async execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.channel.send(
                'You must be in a channel to execute this command.'
            );
        }

        const isUrl = (str) => {
            let regex = /(http|https):\/\/(\w+:{0,1\w*})?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

            return regex.test(str);
        };

        if (isUrl(args[0])) {
            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], { filter: 'audioonly' });

            connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
                voiceChannel.leave();
                message.channel.send("I'm leaving. Bye!");
            });

            await message.reply(`Now playing ***${args[0]}***`);

            return;
        }

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
        };

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
                voiceChannel.leave();
                message.channel.send("I'm leaving. Bye!");
            });

            await message.reply(`Now playing ***${video.title}***`);
        }
    },
};
