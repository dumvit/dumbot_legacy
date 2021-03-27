const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'Joins your channel and plays a music from youtube.',
    /**
     *
     * @param {Discord.Message} message
     * @param {string} args
     * @param {Discord.Client} client
     * @returns
     */
    async execute(message, args, cmd, client, discord) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.channel.send(
                'You must be in a channel to execute this command.'
            );
        }

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play') {
            if (!args.length) return message.channel.send('You need to search for music');
            let music = {};

            if (ytdl.validateURL(args[0])) {
                const musicInfo = await ytdl.getInfo(args[0]);
                music = {
                    title: musicInfo.videoDetails.title,
                    url: musicInfo.videoDetails.video_url,
                };
            } else {
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);

                    return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
                };

                const video = await videoFinder(args.join(' '));

                if (!video) {
                    music = { title: video.title, url: video.url };
                }

                return message.channel.send("We couldn't find your music");
            }

            if (!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    musics: [],
                };

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.musics.push(music);

                try {
                    const connection = await voiceChannel.join();

                    queueConstructor.connection = connection;

                    videoPlayer(message.guild, queueConstructor.musics[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error when trying to connect.');

                    throw err;
                }
            } else {
                serverQueue.musics.push(music);

                return message.channel.send(`**${music.title}** added to the queue.`);
            }
        }
    },
};

/**
 *
 * @param {Discord.Guild} guild
 * @param {*} music
 */
const videoPlayer = async (guild, music) => {
    const musicQueue = queue.get(guild.id);

    if (!music) {
        musicQueue.voiceChannel.leave();
        queue.delete(guild.id);

        return;
    }

    const stream = ytdl(music.url, { filter: 'audioonly' });
    musicQueue.connection.play(stream, { seel: 0, volume: 0.5 }).on('finish', () => {
        musicQueue.musics.shift();
        videoPlayer(guild, musicQueue.musics[0]);
    });

    await musicQueue.textChannel.send(`Now playing **${music.title}**`);
};
