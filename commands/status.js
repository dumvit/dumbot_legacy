const axios = require('axios');

module.exports = {
    name: 'status',
    description: 'Status for of a game',
    async execute(client, message, args, discord) {
        const game = args[0];

        if (game === 'cs' || game === 'CS') {
            const { data } = await axios.get(
                'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=D600990BF32B6157F5E47A0325EA15E8',
            );

            console.log(data);
            console.log(
                `SL:${data.result.services.SessionsLogon}. SC: ${data.result.services.SteamCommunity}`,
            );

            const embed = new discord.MessageEmbed()
                .setColor('GOLD')
                .setTitle('CS:GO embed')
                .setURL('https://steamdb.info/app/730/graphs/')
                .setDescription(
                    'Here are the status for the game Counter Strike: Global Offencive',
                )
                .setAuthor({
                    name: client.user.username,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setThumbnail(
                    'https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/99f6a934a7cf277f2eaece8e3ce619b2.png',
                )
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    {
                        name: 'Sessions Logon',
                        value: data.result.services.SessionsLogon,
                        inline: true,
                    },
                    {
                        name: 'Steam Community',
                        value: data.result.services.SteamCommunity,
                        inline: true,
                    },
                );

            message.channel.send({ embeds: [embed] });
        }
    },
};
