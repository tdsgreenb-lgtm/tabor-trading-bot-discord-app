require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) commands.push(require(`./commands/${file}`).data.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Refreshing commands...');
        if (guildId) await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        else await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Commands deployed!');
    } catch (err) { console.error(err); }
})();
