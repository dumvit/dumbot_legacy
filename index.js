require('dotenv').config();

const discord = require('discord.js');

const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.commands = new discord.Collection();
client.events = new discord.Collection();

['commandHandler', 'eventHandler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client, discord);
});

client.login(process.env.BOT_TOKEN);
